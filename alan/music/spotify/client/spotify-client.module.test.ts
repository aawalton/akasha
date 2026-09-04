import { afterAll, afterEach, beforeEach, expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"
import { fetchingIs, fetchingIsOverHttp } from "../fetching/spotify-fetching.module.code.ts"
import { writeToken } from "../token-store/spotify-token-store.module.code.ts"
import {
  paginateOffset,
  rateLimitMs,
  resolveRateLimitMs,
  resolveUrl,
  retryAfterMs,
  spotifyGet,
  spotifyRequest,
} from "./spotify-client.module.code.ts"

const anything = z.unknown()

const ROOT = mkdtempSync("/var/tmp/spotify-client-")

type Answer = { readonly status: number; readonly body: unknown; readonly retryAfter?: string }

let asked: string[] = []

let sent: (RequestInit | undefined)[] = []

let next = 0

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

function answering(...answers: readonly Answer[]): undefined {
  let at = 0
  fetchingIs(async (url, init) => {
    asked.push(url)
    sent.push(init)
    const one = answers[Math.min(at, answers.length - 1)]
    at += 1
    if (one === undefined) throw new Error("no answer was set up")
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    if (one.retryAfter !== undefined) headers["Retry-After"] = one.retryAfter
    return new Response(JSON.stringify(one.body), { status: one.status, headers })
  })
}

beforeEach(() => {
  asked = []
  sent = []
  next += 1
  process.env.SPOTIFY_TOKEN_FILE = join(ROOT, `at-${next}`, "token.json")
  process.env.SPOTIFY_CLIENT_ID = "an-id"
  process.env.SPOTIFY_CLIENT_SECRET = "a-secret"
  process.env.SPOTIFY_REDIRECT_URI = "https://example.invalid/callback"
  process.env.SPOTIFY_RATE_LIMIT_MS = "1"
  writeToken({
    accessToken: "an-access-token",
    refreshToken: "a-refresh-token",
    expiresAt: "2999-01-01T00:00:00.000Z",
    scopes: ["user-top-read"],
  })
})

afterEach(() => {
  fetchingIsOverHttp()
  delete process.env.SPOTIFY_TOKEN_FILE
  delete process.env.SPOTIFY_CLIENT_ID
  delete process.env.SPOTIFY_CLIENT_SECRET
  delete process.env.SPOTIFY_REDIRECT_URI
  delete process.env.SPOTIFY_RATE_LIMIT_MS
})

test("no gap named is a hundred milliseconds", () => {
  expect(resolveRateLimitMs(undefined)).toBe(100)
})

test("a gap that is no positive whole number is a hundred milliseconds", () => {
  expect(resolveRateLimitMs("0")).toBe(100)
  expect(resolveRateLimitMs("-5")).toBe(100)
  expect(resolveRateLimitMs("1.5")).toBe(100)
  expect(resolveRateLimitMs("soon")).toBe(100)
  expect(resolveRateLimitMs("")).toBe(100)
})

test("a positive whole number is the gap", () => {
  expect(resolveRateLimitMs("250")).toBe(250)
})

test("the gap is read from the environment after this module was loaded", () => {
  process.env.SPOTIFY_RATE_LIMIT_MS = "321"
  expect(rateLimitMs()).toBe(321)
  process.env.SPOTIFY_RATE_LIMIT_MS = "654"
  expect(rateLimitMs()).toBe(654)
})

test("no Retry-After is one second", () => {
  expect(retryAfterMs(null)).toBe(1000)
  expect(retryAfterMs("soon")).toBe(1000)
  expect(retryAfterMs("0")).toBe(1000)
})

test("a Retry-After is read as seconds", () => {
  expect(retryAfterMs("3")).toBe(3000)
})

test("a path is called under the base URL and a full URL is called as it is", () => {
  expect(resolveUrl("/me/player")).toBe("https://api.spotify.com/v1/me/player")
  expect(resolveUrl("https://api.spotify.com/v1/me?x=1")).toBe("https://api.spotify.com/v1/me?x=1")
})

test("three calls are spaced by the gap the environment names after load", async () => {
  process.env.SPOTIFY_RATE_LIMIT_MS = "50"
  answering({ status: 200, body: { ok: true } })
  const opened = Date.now()
  await spotifyGet("/one", anything)
  await spotifyGet("/two", anything)
  await spotifyGet("/three", anything)
  expect(Date.now() - opened).toBeGreaterThanOrEqual(80)
  expect(asked.length).toBe(3)
})

test("a 429 waits the time it is given and is retried once", async () => {
  answering({ status: 429, body: {}, retryAfter: "0.05" }, { status: 200, body: { second: true } })
  const opened = Date.now()
  expect(await spotifyGet("/one", anything)).toEqual({ second: true })
  expect(Date.now() - opened).toBeGreaterThanOrEqual(45)
  expect(asked.length).toBe(2)
})

test("a 429 asking for over sixty seconds throws without waiting", async () => {
  answering({ status: 429, body: {}, retryAfter: "120" })
  const opened = Date.now()
  await expect(spotifyGet("/one", anything)).rejects.toThrow("refuses to block")
  expect(Date.now() - opened).toBeLessThan(1000)
  expect(asked.length).toBe(1)
})

test("a second 429 throws rather than being retried again", async () => {
  answering({ status: 429, body: {}, retryAfter: "0.01" })
  await expect(spotifyGet("/one", anything)).rejects.toThrow("429 rate limited")
  expect(asked.length).toBe(2)
})

test("a 401 forces one refresh and one retry", async () => {
  answering(
    { status: 401, body: {} },
    { status: 200, body: { access_token: "a-fresh-one", token_type: "Bearer", expires_in: 3600 } },
    { status: 200, body: { after: "the refresh" } }
  )
  expect(await spotifyGet("/one", anything)).toEqual({ after: "the refresh" })
  expect(asked[1]).toBe("https://accounts.spotify.com/api/token")
  expect(asked.length).toBe(3)
})

test("a second 401 throws with the body the server sent", async () => {
  answering(
    { status: 401, body: { error: "no" } },
    { status: 200, body: { access_token: "a-fresh-one", token_type: "Bearer", expires_in: 3600 } },
    { status: 401, body: { error: "still no" } }
  )
  await expect(spotifyGet("/one", anything)).rejects.toThrow("spotify API 401")
})

test("a 404 throws with its status and its body", async () => {
  answering({ status: 404, body: { error: "gone" } })
  await expect(spotifyGet("/one", anything)).rejects.toThrow("spotify API 404")
})

test("a shape the answer does not match throws", async () => {
  answering({ status: 200, body: { id: 7 } })
  await expect(spotifyGet("/one", z.object({ id: z.string() }))).rejects.toThrow()
})

test("a body is sent as JSON where no raw content type is named", async () => {
  answering({ status: 200, body: null })
  await spotifyRequest("/me/player", z.null(), { method: "PUT", body: { device_ids: ["a"] } })
  expect(sent[0]?.body).toBe(JSON.stringify({ device_ids: ["a"] }))
  expect(sent[0]?.method).toBe("PUT")
})

test("paging follows next until it is null", async () => {
  answering(
    {
      status: 200,
      body: {
        items: [{ id: "one" }],
        total: 2,
        limit: 1,
        offset: 0,
        next: "https://api.spotify.com/v1/me/top/tracks?offset=1",
        previous: null,
      },
    },
    {
      status: 200,
      body: {
        items: [{ id: "two" }],
        total: 2,
        limit: 1,
        offset: 1,
        next: null,
        previous: null,
      },
    }
  )
  const all = await paginateOffset("/me/top/tracks", z.object({ id: z.string() }))
  expect(all).toEqual([{ id: "one" }, { id: "two" }])
})

test("paging stops at the most it was asked for", async () => {
  answering({
    status: 200,
    body: {
      items: [{ id: "one" }, { id: "two" }, { id: "three" }],
      total: 9,
      limit: 3,
      offset: 0,
      next: "https://api.spotify.com/v1/me/top/tracks?offset=3",
      previous: null,
    },
  })
  const all = await paginateOffset("/me/top/tracks", z.object({ id: z.string() }), { max: 2 })
  expect(all).toEqual([{ id: "one" }, { id: "two" }])
  expect(asked.length).toBe(1)
})
