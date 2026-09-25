#!/usr/bin/env bun

import crypto from "node:crypto"
import {
  parseTokenResponse,
  persistTokenResponse,
  postToken,
} from "akasha/alan/music/spotify/modules/auth/spotify-auth.module.code.ts"
import { getCredentials } from "akasha/alan/music/spotify/modules/credentials/spotify-credentials.module.code.ts"
import type { Fetching } from "akasha/alan/music/spotify/modules/fetching/spotify-fetching.module.code.ts"
import {
  readPkce,
  removePkce,
  writePkce,
} from "akasha/alan/music/spotify/modules/pkce-store/spotify-pkce-store.module.code.ts"
import {
  SPOTIFY_SCOPE_STRING,
  SPOTIFY_SCOPES,
} from "akasha/alan/music/spotify/modules/scopes/spotify-scopes.module.code.ts"

const AUTHORIZE_URL = "https://accounts.spotify.com/authorize"

const HERE = import.meta.path

type PkcePair = { readonly verifier: string; readonly challenge: string }

export function challengeFor(verifier: string): string {
  return crypto.createHash("sha256").update(verifier).digest("base64url")
}

export function makePkcePair(): PkcePair {
  const verifier = crypto.randomBytes(32).toString("base64url")
  return { verifier, challenge: challengeFor(verifier) }
}

export function authorizeUrlFor(
  clientId: string,
  redirectUri: string,
  state: string,
  challenge: string
): string {
  const url = new URL(AUTHORIZE_URL)
  url.searchParams.set("client_id", clientId)
  url.searchParams.set("response_type", "code")
  url.searchParams.set("redirect_uri", redirectUri)
  url.searchParams.set("scope", SPOTIFY_SCOPE_STRING)
  url.searchParams.set("state", state)
  url.searchParams.set("code_challenge_method", "S256")
  url.searchParams.set("code_challenge", challenge)
  return url.toString()
}

export function readCodeFlag(args: readonly string[]): string {
  const at = args.indexOf("--code")
  const value = at >= 0 ? args[at + 1] : undefined
  if (value == null || value.startsWith("--") || value.length === 0) {
    throw new Error(`missing --code <CODE>\n  usage: bun run ${HERE} exchange --code <CODE>`)
  }
  return value
}

export type Caught = { readonly code: string } | { readonly refused: string }

export function loopbackPortIn(redirectUri: string): number | null {
  let url: URL
  try {
    url = new URL(redirectUri)
  } catch {
    return null
  }
  if (url.protocol !== "http:") return null
  if (url.hostname !== "127.0.0.1" && url.hostname !== "localhost") return null
  const port = Number(url.port)
  return Number.isInteger(port) && port > 0 ? port : null
}

export function caughtIn(asked: URL, state: string, path: string): Caught | null {
  if (asked.pathname !== path) return null
  const said = asked.searchParams.get("error")
  if (said !== null) return { refused: `spotify refused the consent, saying ${said}` }
  if (asked.searchParams.get("state") !== state) {
    return { refused: "the callback came back under a state this run never sent" }
  }
  const code = asked.searchParams.get("code")
  if (code == null || code === "") return { refused: "the callback carried no code" }
  return { code }
}

export function pageFor(caught: Caught): string {
  const told =
    "refused" in caught ? caught.refused : "Spotify consent is saved. This tab can be closed."
  return `<!doctype html><meta charset="utf-8"><title>Spotify</title><body style="font:16px system-ui;padding:3rem">${told}</body>`
}

function caughtAt(port: number, path: string, state: string): Promise<Caught> {
  return new Promise<Caught>((settle) => {
    const server = Bun.serve({
      port,
      hostname: "127.0.0.1",
      fetch(request) {
        const caught = caughtIn(new URL(request.url), state, path)
        if (caught === null) return new Response("no such path", { status: 404 })
        setTimeout(() => {
          server.stop(true)
          settle(caught)
        }, 50)
        return new Response(pageFor(caught), { headers: { "Content-Type": "text/html" } })
      },
    })
  })
}

async function traded(code: string, over?: Fetching): Promise<void> {
  const handoff = readPkce()
  if (handoff == null) {
    throw new Error(`no saved PKCE handoff — run the first step first:\n  bun run ${HERE}`)
  }
  const { redirectUri } = getCredentials()
  const response = await postToken(
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: handoff.verifier,
    }),
    over
  )
  const data = await parseTokenResponse(response)
  persistTokenResponse(data, undefined, SPOTIFY_SCOPES)
  removePkce()
}

function toldOver(redirectUri: string, url: string): readonly string[] {
  return [
    "Step 1 — open this URL in a browser and approve Spotify access:\n",
    url,
    `\nThe callback (${redirectUri}) shows the authorization code.\n` +
      "Then run step 2 with that code:\n" +
      `  bun run ${HERE} exchange --code <CODE>`,
  ]
}

async function consented(over?: Fetching): Promise<void> {
  const { clientId, redirectUri } = getCredentials()
  const { verifier, challenge } = makePkcePair()
  const state = crypto.randomBytes(16).toString("hex")
  writePkce({ verifier })
  const url = authorizeUrlFor(clientId, redirectUri, state, challenge)
  const port = loopbackPortIn(redirectUri)
  if (port === null) {
    for (const line of toldOver(redirectUri, url)) console.log(line)
    return
  }
  console.log("Open this URL and approve Spotify access — this run finishes on its own:\n")
  console.log(url)
  const caught = await caughtAt(port, new URL(redirectUri).pathname, state)
  if ("refused" in caught) throw new Error(caught.refused)
  await traded(caught.code, over)
  console.log("The Spotify tokens are saved.")
}

export async function runAuthCli(args: readonly string[], over?: Fetching): Promise<void> {
  if (args[0] === "exchange") {
    await traded(readCodeFlag(args.slice(1)), over)
    console.log("Step 2 — the Spotify tokens are saved.")
    return
  }
  await consented(over)
}

if (import.meta.main) {
  runAuthCli(process.argv.slice(2)).catch((thrown) => {
    console.error("Spotify auth failed:", thrown instanceof Error ? thrown.message : thrown)
    process.exit(1)
  })
}
