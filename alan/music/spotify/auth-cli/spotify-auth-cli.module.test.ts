import { afterAll, afterEach, beforeEach, expect, test } from "bun:test"
import crypto from "node:crypto"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { fetchingIs, fetchingIsOverHttp } from "../fetching/spotify-fetching.module.code.ts"
import { readPkce, writePkce } from "../pkce-store/spotify-pkce-store.module.code.ts"
import { readToken } from "../token-store/spotify-token-store.module.code.ts"
import {
  authorizeUrlFor,
  challengeFor,
  makePkcePair,
  readCodeFlag,
  runAuthCli,
} from "./spotify-auth-cli.module.code.ts"

const ROOT = mkdtempSync("/var/tmp/spotify-auth-cli-")

let next = 0

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

beforeEach(() => {
  next += 1
  const at = join(ROOT, `at-${next}`)
  process.env.SPOTIFY_PKCE_FILE = join(at, "pkce.json")
  process.env.SPOTIFY_TOKEN_FILE = join(at, "token.json")
  process.env.SPOTIFY_CLIENT_ID = "an-id"
  process.env.SPOTIFY_CLIENT_SECRET = "a-secret"
  process.env.SPOTIFY_REDIRECT_URI = "https://example.invalid/callback"
})

afterEach(() => {
  fetchingIsOverHttp()
  delete process.env.SPOTIFY_PKCE_FILE
  delete process.env.SPOTIFY_TOKEN_FILE
  delete process.env.SPOTIFY_CLIENT_ID
  delete process.env.SPOTIFY_CLIENT_SECRET
  delete process.env.SPOTIFY_REDIRECT_URI
})

test("a challenge is the SHA-256 of the verifier in base64url", () => {
  const wanted = crypto.createHash("sha256").update("a-verifier").digest("base64url")
  expect(challengeFor("a-verifier")).toBe(wanted)
})

test("a pair carries a verifier and the challenge for it", () => {
  const pair = makePkcePair()
  expect(pair.verifier.length).toBeGreaterThanOrEqual(43)
  expect(challengeFor(pair.verifier)).toBe(pair.challenge)
})

test("a verifier carries none of the characters a URL would escape", () => {
  expect(/^[A-Za-z0-9_-]+$/.test(makePkcePair().verifier)).toBe(true)
})

test("the authorize URL names the challenge method Spotify wants", () => {
  const url = new URL(authorizeUrlFor("an-id", "https://example.invalid/cb", "a-state", "a-hash"))
  expect(url.searchParams.get("code_challenge_method")).toBe("S256")
  expect(url.searchParams.get("code_challenge")).toBe("a-hash")
  expect(url.searchParams.get("response_type")).toBe("code")
  expect(url.searchParams.get("state")).toBe("a-state")
  expect(url.searchParams.get("scope")).toContain("user-read-recently-played")
})

test("no code given throws with the usage", () => {
  expect(() => readCodeFlag([])).toThrow("missing --code")
  expect(() => readCodeFlag(["--code"])).toThrow("missing --code")
  expect(() => readCodeFlag(["--code", "--json"])).toThrow("missing --code")
})

test("a code given is read", () => {
  expect(readCodeFlag(["--code", "a-code"])).toBe("a-code")
})

test("the second step run with no first step throws", async () => {
  await expect(runAuthCli(["exchange", "--code", "a-code"])).rejects.toThrow(
    "no saved PKCE handoff"
  )
})

test("the second step saves the token and takes the handoff away", async () => {
  writePkce({ verifier: "a-verifier", state: "a-state" })
  let sent: unknown
  fetchingIs(async (_url, init) => {
    sent = init.body
    return new Response(
      JSON.stringify({
        access_token: "a-new-access-token",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "a-new-refresh-token",
        scope: "user-top-read",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  })
  await runAuthCli(["exchange", "--code", "a-code"])
  expect(String(sent)).toContain("code_verifier=a-verifier")
  expect(String(sent)).toContain("grant_type=authorization_code")
  expect(readToken()?.refreshToken).toBe("a-new-refresh-token")
  expect(readToken()?.scopes).toEqual(["user-top-read"])
  expect(readPkce()).toBe(null)
})
