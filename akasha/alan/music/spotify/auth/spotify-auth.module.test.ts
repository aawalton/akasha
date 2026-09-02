import { afterAll, afterEach, beforeEach, expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { fetchingIs, fetchingIsOverHttp } from "../fetching/spotify-fetching.module.code.ts"
import {
  readToken,
  type SpotifyToken,
  writeToken,
} from "../token-store/spotify-token-store.module.code.ts"
import {
  forceRefresh,
  getOAuthAccessToken,
  isExpired,
  parseTokenResponse,
  persistTokenResponse,
  scopesFromResponse,
} from "./spotify-auth.module.code.ts"

const STORED: SpotifyToken = {
  accessToken: "the-old-access-token",
  refreshToken: "the-stored-refresh-token",
  expiresAt: "2999-01-01T00:00:00.000Z",
  scopes: ["user-top-read", "user-read-email"],
}

const ROOT = mkdtempSync("/var/tmp/spotify-auth-")

let next = 0

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

function answeringWith(body: unknown): undefined {
  fetchingIs(async () => {
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  })
}

beforeEach(() => {
  next += 1
  process.env.SPOTIFY_TOKEN_FILE = join(ROOT, `at-${next}`, "token.json")
  process.env.SPOTIFY_CLIENT_ID = "an-id"
  process.env.SPOTIFY_CLIENT_SECRET = "a-secret"
  process.env.SPOTIFY_REDIRECT_URI = "https://example.invalid/callback"
})

afterEach(() => {
  fetchingIsOverHttp()
  delete process.env.SPOTIFY_TOKEN_FILE
  delete process.env.SPOTIFY_CLIENT_ID
  delete process.env.SPOTIFY_CLIENT_SECRET
  delete process.env.SPOTIFY_REDIRECT_URI
})

test("a token an hour from expiry is good", () => {
  const at = Date.parse("2026-01-01T00:00:00.000Z")
  expect(isExpired({ ...STORED, expiresAt: "2026-01-01T01:00:00.000Z" }, at)).toBe(false)
})

test("a token sixty-one seconds from expiry is good", () => {
  const at = Date.parse("2026-01-01T00:00:00.000Z")
  expect(isExpired({ ...STORED, expiresAt: "2026-01-01T00:01:01.000Z" }, at)).toBe(false)
})

test("a token sixty seconds from expiry is treated as expired", () => {
  const at = Date.parse("2026-01-01T00:00:00.000Z")
  expect(isExpired({ ...STORED, expiresAt: "2026-01-01T00:01:00.000Z" }, at)).toBe(true)
})

test("scopes fall back to what was stored where the answer names none", () => {
  expect(scopesFromResponse(undefined, ["a", "b"])).toEqual(["a", "b"])
  expect(scopesFromResponse("", ["a", "b"])).toEqual(["a", "b"])
})

test("scopes the answer names are parted on spaces", () => {
  expect(scopesFromResponse("one  two", ["a"])).toEqual(["one", "two"])
})

test("a token answer that is not ok throws with the body in it", async () => {
  const response = new Response("no such refresh token", { status: 400 })
  await expect(parseTokenResponse(response)).rejects.toThrow("spotify token endpoint 400")
})

test("a persisted answer with no refresh token keeps the one already stored", () => {
  const token = persistTokenResponse(
    { access_token: "a-new-access-token", token_type: "Bearer", expires_in: 3600 },
    STORED.refreshToken,
    STORED.scopes
  )
  expect(token.refreshToken).toBe(STORED.refreshToken)
  expect(token.scopes).toEqual(STORED.scopes)
  expect(readToken()).toEqual(token)
})

test("a persisted answer with no refresh token and none stored throws", () => {
  expect(() =>
    persistTokenResponse(
      { access_token: "a-new-access-token", token_type: "Bearer", expires_in: 3600 },
      undefined,
      []
    )
  ).toThrow("carried no refresh token")
})

test("an expiry is written as an instant that far ahead", () => {
  const before = Date.now()
  const token = persistTokenResponse(
    { access_token: "a-new-access-token", token_type: "Bearer", expires_in: 3600 },
    STORED.refreshToken,
    STORED.scopes
  )
  const ahead = new Date(token.expiresAt).getTime() - before
  expect(ahead).toBeGreaterThanOrEqual(3_600_000)
  expect(ahead).toBeLessThan(3_610_000)
})

test("a refresh writes the new access token into the store", async () => {
  writeToken(STORED)
  answeringWith({
    access_token: "a-refreshed-access-token",
    token_type: "Bearer",
    expires_in: 3600,
  })
  const token = await forceRefresh()
  expect(token.accessToken).toBe("a-refreshed-access-token")
  expect(readToken()?.accessToken).toBe("a-refreshed-access-token")
})

test("a good stored token is given back without any call", async () => {
  writeToken(STORED)
  fetchingIs(async () => {
    throw new Error("no call is made for a token that is still good")
  })
  expect(await getOAuthAccessToken()).toBe(STORED.accessToken)
})

test("an expired stored token is refreshed before it is given back", async () => {
  writeToken({ ...STORED, expiresAt: "2001-01-01T00:00:00.000Z" })
  answeringWith({
    access_token: "a-refreshed-access-token",
    token_type: "Bearer",
    expires_in: 3600,
  })
  expect(await getOAuthAccessToken()).toBe("a-refreshed-access-token")
})

test("no stored token throws and names the consent command", async () => {
  await expect(getOAuthAccessToken()).rejects.toThrow("no token is stored")
})
