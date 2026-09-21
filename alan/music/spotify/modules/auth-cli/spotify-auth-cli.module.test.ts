import { afterAll, afterEach, beforeEach, expect, test } from "bun:test"
import crypto from "node:crypto"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  authorizeUrlFor,
  type Caught,
  caughtIn,
  challengeFor,
  loopbackPortIn,
  makePkcePair,
  pageFor,
  readCodeFlag,
  runAuthCli,
} from "akasha/alan/music/spotify/modules/auth-cli/spotify-auth-cli.module.code.ts"
import type { Fetching } from "akasha/alan/music/spotify/modules/fetching/spotify-fetching.module.code.ts"
import {
  readPkce,
  writePkce,
} from "akasha/alan/music/spotify/modules/pkce-store/spotify-pkce-store.module.code.ts"
import { readToken } from "akasha/alan/music/spotify/modules/token-store/spotify-token-store.module.code.ts"

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

test("a loopback address is http at 127.0.0.1 or localhost, naming a port", () => {
  expect(loopbackPortIn("http://127.0.0.1:8899/callback")).toBe(8899)
  expect(loopbackPortIn("http://localhost:8899/callback")).toBe(8899)
  expect(loopbackPortIn("https://alanwalton.com/api/spotify/callback")).toBe(null)
  expect(loopbackPortIn("http://127.0.0.1/callback")).toBe(null)
  expect(loopbackPortIn("https://127.0.0.1:8899/callback")).toBe(null)
  expect(loopbackPortIn("not a url at all")).toBe(null)
})

test("the callback the run opened for carries the code", () => {
  const asked = new URL("http://127.0.0.1:8899/callback?code=a-code&state=a-state")
  expect(caughtIn(asked, "a-state", "/callback")).toEqual({ code: "a-code" })
})

test("a callback coming back under another state is refused rather than traded", () => {
  const asked = new URL("http://127.0.0.1:8899/callback?code=a-code&state=another")
  expect(caughtIn(asked, "a-state", "/callback")).toEqual({
    refused: "the callback came back under a state this run never sent",
  })
})

test("a refusal Spotify sends back is said rather than traded", () => {
  const asked = new URL("http://127.0.0.1:8899/callback?error=access_denied&state=a-state")
  expect(caughtIn(asked, "a-state", "/callback")).toEqual({
    refused: "spotify refused the consent, saying access_denied",
  })
})

test("a callback carrying no code is refused", () => {
  const asked = new URL("http://127.0.0.1:8899/callback?state=a-state")
  expect(caughtIn(asked, "a-state", "/callback")).toEqual({
    refused: "the callback carried no code",
  })
})

test("the server answers the one path the callback names", () => {
  const asked = new URL("http://127.0.0.1:8899/elsewhere?code=a-code&state=a-state")
  expect(caughtIn(asked, "a-state", "/callback")).toBe(null)
})

test("the page shown says what became of the consent", () => {
  const caught: Caught = { code: "a-code" }
  expect(pageFor(caught)).toContain("Spotify consent is saved")
  expect(pageFor({ refused: "the callback carried no code" })).toContain(
    "the callback carried no code"
  )
})

test("a trade run with no verifier saved throws", async () => {
  await expect(runAuthCli(["exchange", "--code", "a-code"])).rejects.toThrow(
    "no saved PKCE handoff"
  )
})

test("the trade saves the token and takes the handoff away", async () => {
  writePkce({ verifier: "a-verifier" })
  let sent: unknown
  const answering: Fetching = async (_url, init) => {
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
  }
  await runAuthCli(["exchange", "--code", "a-code"], answering)
  expect(String(sent)).toContain("code_verifier=a-verifier")
  expect(String(sent)).toContain("grant_type=authorization_code")
  expect(readToken()?.refreshToken).toBe("a-new-refresh-token")
  expect(readToken()?.scopes).toEqual(["user-top-read"])
  expect(readPkce()).toBe(null)
})
