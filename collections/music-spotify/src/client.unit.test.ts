import { afterEach, beforeEach, describe, expect, mock, spyOn, test } from "bun:test"
import { z } from "zod"
import { cursorPageSchema, offsetPageSchema, resolveRateLimitMs, spotifyRequest } from "./client"
import { parseSpotifyResponse } from "./parse"

mock.module("./oauth", () => ({
  getCredentials: () => ({ clientId: "id", clientSecret: "secret", redirectUri: "uri" }),
  basicAuthHeader: () => "Basic dGVzdA==",
  parseTokenResponse: async () => ({ access_token: "t", token_type: "Bearer", expires_in: 3600 }),
  persistTokenResponse: () => ({ accessToken: "t", refreshToken: "r", expiresAt: 0 }),
  forceRefresh: async () => ({ accessToken: "t", refreshToken: "r", expiresAt: 0 }),
  getOAuthAccessToken: async () => "test-token",
}))

const itemSchema = z.object({ id: z.string() }).passthrough()

describe("resolveRateLimitMs", () => {
  test("defaults to 100 when unset", () => {
    expect(resolveRateLimitMs(undefined)).toBe(100)
  })

  test("honors a positive integer override (1000ms paced run)", () => {
    expect(resolveRateLimitMs("1000")).toBe(1000)
  })

  test("falls back to the default for non-numeric, zero, negative, or fractional values", () => {
    expect(resolveRateLimitMs("abc")).toBe(100)
    expect(resolveRateLimitMs("")).toBe(100)
    expect(resolveRateLimitMs("0")).toBe(100)
    expect(resolveRateLimitMs("-500")).toBe(100)
    expect(resolveRateLimitMs("100.5")).toBe(100)
  })
})

describe("offsetPageSchema", () => {
  test("parses an offset paging object and preserves unknown keys", () => {
    const parsed = offsetPageSchema(itemSchema).parse({
      items: [{ id: "a", extra: 1 }],
      total: 1,
      limit: 20,
      offset: 0,
      next: null,
      previous: null,
      href: "https://api.spotify.com/v1/x",
    })
    expect(parsed.items[0]?.id).toBe("a")
    expect(parsed.next).toBeNull()
  })
})

describe("cursorPageSchema", () => {
  test("parses a cursor paging object with null cursors", () => {
    const parsed = cursorPageSchema(itemSchema).parse({
      items: [{ id: "b" }],
      limit: 50,
      next: "https://api.spotify.com/v1/me/following?after=xyz",
      cursors: { after: "xyz" },
    })
    expect(parsed.items).toHaveLength(1)
    expect(parsed.next).toContain("after=xyz")
  })
})

describe("parseSpotifyResponse", () => {
  test("parses through the boundary helper", () => {
    expect(parseSpotifyResponse(itemSchema, { id: "z" })).toEqual({ id: "z" })
  })

  test("throws on a shape mismatch", () => {
    expect(() => parseSpotifyResponse(itemSchema, { id: 1 })).toThrow()
  })
})

function fakeFetch(handler: () => Promise<Response>): typeof globalThis.fetch {
  return Object.assign(handler, { preconnect: () => {} })
}

describe("spotifyRequest 429 handling", () => {
  const fetchSpy = spyOn(globalThis, "fetch")
  let fetchCalls = 0

  beforeEach(() => {
    fetchCalls = 0
  })

  afterEach(() => {
    fetchSpy.mockReset()
  })

  test("a 429 with a huge Retry-After surfaces a rate-limit error instead of sleeping unbounded", async () => {
    fetchSpy.mockImplementation(
      fakeFetch(async () => {
        fetchCalls += 1
        return new Response("rate limited", { status: 429, headers: { "Retry-After": "77111" } })
      })
    )

    let caught: unknown
    try {
      await spotifyRequest("/me/player/recently-played", itemSchema)
    } catch (e) {
      caught = e
    }

    expect(caught).toBeInstanceOf(Error)
    if (!(caught instanceof Error)) throw new Error("expected an Error to be thrown")
    expect(caught.message).toContain("429")
    expect(caught.message).toContain("77111")
    expect(fetchCalls).toBe(1)
  })

  test("a 429 with a small Retry-After under the cap retries and then succeeds", async () => {
    const responses = [
      new Response("rate limited", { status: 429, headers: { "Retry-After": "1" } }),
      new Response(JSON.stringify({ id: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ]
    fetchSpy.mockImplementation(
      fakeFetch(async () => {
        fetchCalls += 1
        const response = responses[fetchCalls - 1]
        if (response === undefined) throw new Error("unexpected extra fetch call")
        return response
      })
    )

    const result = await spotifyRequest("/me", itemSchema)

    expect(result).toEqual({ id: "ok" })
    expect(fetchCalls).toBe(2)
  })
})
