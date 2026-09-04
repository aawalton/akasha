#!/usr/bin/env bun

import crypto from "node:crypto"
import {
  parseTokenResponse,
  persistTokenResponse,
  TOKEN_URL,
} from "../auth/spotify-auth.module.code.ts"
import { basicAuthHeader, getCredentials } from "../credentials/spotify-credentials.module.code.ts"
import { fetchSpotify } from "../fetching/spotify-fetching.module.code.ts"
import { readPkce, removePkce, writePkce } from "../pkce-store/spotify-pkce-store.module.code.ts"
import { SPOTIFY_SCOPE_STRING, SPOTIFY_SCOPES } from "../scopes/spotify-scopes.module.code.ts"

const AUTHORIZE_URL = "https://accounts.spotify.com/authorize"

const HERE = "alan/music/spotify/auth-cli/spotify-auth-cli.module.code.ts"

export type PkcePair = { readonly verifier: string; readonly challenge: string }

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

function generate(): undefined {
  const { clientId, redirectUri } = getCredentials()
  const { verifier, challenge } = makePkcePair()
  const state = crypto.randomBytes(16).toString("hex")
  writePkce({ verifier, state })
  console.log("Step 1 — open this URL in a browser and approve Spotify access:\n")
  console.log(authorizeUrlFor(clientId, redirectUri, state, challenge))
  console.log(
    `\nThe callback (${redirectUri}) shows the authorization code.\n` +
      "Then run step 2 with that code:\n" +
      `  bun run ${HERE} exchange --code <CODE>`
  )
}

async function exchange(args: readonly string[]): Promise<void> {
  const code = readCodeFlag(args)
  const handoff = readPkce()
  if (handoff == null) {
    throw new Error(`no saved PKCE handoff — run step 1 first:\n  bun run ${HERE}`)
  }
  const { redirectUri } = getCredentials()
  const response = await fetchSpotify(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuthHeader(),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: handoff.verifier,
    }),
  })
  const data = await parseTokenResponse(response)
  persistTokenResponse(data, undefined, SPOTIFY_SCOPES)
  removePkce()
  console.log("Step 2 — the Spotify tokens are saved.")
}

export async function runAuthCli(args: readonly string[]): Promise<void> {
  if (args[0] === "exchange") {
    await exchange(args.slice(1))
    return
  }
  generate()
}

if (import.meta.main) {
  runAuthCli(process.argv.slice(2)).catch((thrown) => {
    console.error("Spotify auth failed:", thrown instanceof Error ? thrown.message : thrown)
    process.exit(1)
  })
}
