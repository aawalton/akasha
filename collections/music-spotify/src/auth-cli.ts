#!/usr/bin/env bun

import crypto from "node:crypto"
import { basicAuthHeader, getCredentials, parseTokenResponse, persistTokenResponse } from "./oauth"
import { readPkce, removePkce, writePkce } from "./pkce-store"
import { SPOTIFY_SCOPE_STRING, SPOTIFY_SCOPES } from "./scopes"

const AUTHORIZE_URL = "https://accounts.spotify.com/authorize"
const TOKEN_URL = "https://accounts.spotify.com/api/token"

function base64url(buf: Buffer): string {
  return buf.toString("base64url")
}

function makePkcePair(): { verifier: string; challenge: string } {
  const verifier = base64url(crypto.randomBytes(32))
  const challenge = base64url(crypto.createHash("sha256").update(verifier).digest())
  return { verifier, challenge }
}

function generate(): undefined {
  const { clientId, redirectUri } = getCredentials()
  const { verifier, challenge } = makePkcePair()
  const state = crypto.randomBytes(16).toString("hex")

  writePkce({ verifier, state })

  const authorizeUrl = new URL(AUTHORIZE_URL)
  authorizeUrl.searchParams.set("client_id", clientId)
  authorizeUrl.searchParams.set("response_type", "code")
  authorizeUrl.searchParams.set("redirect_uri", redirectUri)
  authorizeUrl.searchParams.set("scope", SPOTIFY_SCOPE_STRING)
  authorizeUrl.searchParams.set("state", state)
  authorizeUrl.searchParams.set("code_challenge_method", "S256")
  authorizeUrl.searchParams.set("code_challenge", challenge)

  console.log("Step 1 — open this URL in a browser and approve Spotify access:\n")
  console.log(authorizeUrl.toString())
  console.log(
    `\nThe callback (${redirectUri}) will display the authorization code.\n` +
      "Then run step 2 with that code:\n" +
      "  bun run --cwd collections/music-spotify auth:exchange --code <CODE>"
  )
}

function readCodeFlag(args: readonly string[]): string {
  const idx = args.indexOf("--code")
  const value = idx >= 0 ? args[idx + 1] : undefined
  if (value == null || value.startsWith("--") || value.length === 0) {
    throw new Error(
      "missing --code <CODE>\n  usage: bun run auth:exchange --code <authorization-code>"
    )
  }
  return value
}

async function exchange(args: readonly string[]): Promise<void> {
  const code = readCodeFlag(args)
  const handoff = readPkce()
  if (handoff == null) {
    throw new Error(
      "no saved PKCE handoff — run step 1 first:\n  bun run --cwd collections/music-spotify auth"
    )
  }
  const { redirectUri } = getCredentials()

  const response = await fetch(TOKEN_URL, {
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
  console.log("Step 2 — Spotify OAuth tokens saved successfully.")
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const subcommand = args[0]
  if (subcommand === "exchange") {
    await exchange(args.slice(1))
    return
  }
  generate()
}

main().catch((error) => {
  console.error("Spotify auth failed:", error instanceof Error ? error.message : error)
  process.exit(1)
})
