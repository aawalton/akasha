import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test"

mock.module("./oauth", () => ({
  getCredentials: () => ({ clientId: "x", clientSecret: "y", redirectUri: "z" }),
  basicAuthHeader: () => "Basic x",
  parseTokenResponse: async () => ({}),
  persistTokenResponse: () => ({}),
  forceRefresh: async () => ({}),
  getOAuthAccessToken: async () => "test-token",
}))

import {
  buildContainsPath,
  buildListPath,
  buildWritePath,
  containsSaved,
  exerciseSavedRoundTrip,
  listSavedPage,
  paginateSaved,
  removeSaved,
  saveSaved,
} from "./endpoints/library"

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function emptyResponse(): Response {
  return new Response("", { status: 200 })
}

function offsetPage(items: readonly unknown[], next: string | null) {
  return { items, total: items.length, limit: items.length, offset: 0, next, previous: null }
}

interface Call {
  readonly url: string
  readonly method: string
}

const originalFetch = globalThis.fetch
let queue: Response[] = []
let calls: Call[] = []

beforeEach(() => {
  queue = []
  calls = []
  const handler = (
    input: Parameters<typeof fetch>[0],
    init?: Parameters<typeof fetch>[1]
  ): Promise<Response> => {
    calls.push({ url: String(input), method: init?.method ?? "GET" })
    const next = queue.shift()
    if (next === undefined) throw new Error(`unexpected fetch: ${String(input)}`)
    return Promise.resolve(next)
  }
  globalThis.fetch = Object.assign(handler, { preconnect: () => {} })
})

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe("path builders", () => {
  test("buildListPath includes only set params", () => {
    expect(buildListPath("tracks")).toBe("/me/tracks")
    const path = buildListPath("shows", { limit: 5, offset: 10, market: "US" })
    expect(path).toContain("/me/shows?")
    expect(path).toContain("limit=5")
    expect(path).toContain("offset=10")
    expect(path).toContain("market=US")
  })

  test("buildContainsPath joins ids with commas", () => {
    expect(buildContainsPath("albums", ["a", "b", "c"])).toBe("/me/albums/contains?ids=a,b,c")
  })

  test("buildWritePath joins ids with commas", () => {
    expect(buildWritePath("episodes", ["e1", "e2"])).toBe("/me/episodes?ids=e1,e2")
  })
})

describe("listSavedPage", () => {
  test("parses a wrapped saved-track page", async () => {
    queue.push(
      jsonResponse(
        offsetPage([{ added_at: "2020-01-01T00:00:00Z", track: { id: "t1", name: "Track" } }], null)
      )
    )
    const page = await listSavedPage("tracks", { limit: 5 })
    expect(page.items).toHaveLength(1)
    expect(calls[0]?.url).toContain("/me/tracks?")
    expect(calls[0]?.method).toBe("GET")
  })

  test("parses a bare saved-audiobook page (no added_at wrapper)", async () => {
    queue.push(jsonResponse(offsetPage([{ id: "ab1", name: "Audiobook" }], null)))
    const page = await listSavedPage("audiobooks")
    expect(page.items).toHaveLength(1)
  })

  test("throws on a shape mismatch (boundary parse)", async () => {
    queue.push(jsonResponse({ items: "not-an-array", total: 0, limit: 0, offset: 0, next: null }))
    await expect(listSavedPage("albums")).rejects.toThrow()
  })

  test("throws on a non-ok HTTP status", async () => {
    queue.push(jsonResponse({ error: { status: 404, message: "no" } }, 404))
    await expect(listSavedPage("albums")).rejects.toThrow(/404/)
  })
})

describe("paginateSaved", () => {
  test("follows next across pages and flattens items", async () => {
    queue.push(
      jsonResponse(
        offsetPage(
          [
            { added_at: "x", album: { id: "a1", name: "A1" } },
            { added_at: "x", album: { id: "a2", name: "A2" } },
          ],
          "https://api.spotify.com/v1/me/albums?offset=2"
        )
      )
    )
    queue.push(jsonResponse(offsetPage([{ added_at: "x", album: { id: "a3", name: "A3" } }], null)))
    const items = await paginateSaved("albums")
    expect(items).toHaveLength(3)
    expect(calls).toHaveLength(2)
    expect(calls[1]?.url).toContain("offset=2")
  })
})

describe("containsSaved", () => {
  test("returns the boolean array in request order", async () => {
    queue.push(jsonResponse([true, false, true]))
    const result = await containsSaved("tracks", ["a", "b", "c"])
    expect(result).toEqual([true, false, true])
    expect(calls[0]?.url).toContain("/me/tracks/contains?ids=a,b,c")
  })

  test("throws when the body is not a boolean array", async () => {
    queue.push(jsonResponse([1, 2]))
    await expect(containsSaved("tracks", ["a"])).rejects.toThrow()
  })
})

describe("saveSaved / removeSaved (empty 200 body)", () => {
  test("save issues a PUT to the write path and resolves on empty body", async () => {
    queue.push(emptyResponse())
    await expect(saveSaved("shows", ["s1"])).resolves.toBeUndefined()
    expect(calls[0]?.method).toBe("PUT")
    expect(calls[0]?.url).toContain("/me/shows?ids=s1")
  })

  test("remove issues a DELETE to the write path and resolves on empty body", async () => {
    queue.push(emptyResponse())
    await expect(removeSaved("shows", ["s1"])).resolves.toBeUndefined()
    expect(calls[0]?.method).toBe("DELETE")
  })

  test("save throws on a non-ok status", async () => {
    queue.push(jsonResponse({ error: { status: 403, message: "forbidden" } }, 403))
    await expect(saveSaved("tracks", ["t1"])).rejects.toThrow(/403/)
  })
})

describe("exerciseSavedRoundTrip (self-cleaning)", () => {
  test("leaves an already-saved item untouched (no writes)", async () => {
    queue.push(jsonResponse([true]))
    const result = await exerciseSavedRoundTrip("tracks", "t1")
    expect(result).toMatchObject({ reachable: true, alreadySaved: true, mutated: false })
    expect(calls).toHaveLength(1)
    expect(calls[0]?.method).toBe("GET")
  })

  test("saves, verifies, removes, and confirms restoration", async () => {
    queue.push(jsonResponse([false]))
    queue.push(emptyResponse())
    queue.push(jsonResponse([true]))
    queue.push(emptyResponse())
    queue.push(jsonResponse([false]))
    const result = await exerciseSavedRoundTrip("albums", "a1")
    expect(result).toMatchObject({ reachable: true, alreadySaved: false, mutated: true })
    expect(calls.map((c) => c.method)).toEqual(["GET", "PUT", "GET", "DELETE", "GET"])
  })

  test("records unreachable when save is rejected (no mutation)", async () => {
    queue.push(jsonResponse([false]))
    queue.push(jsonResponse({ error: { status: 404, message: "not in market" } }, 404))
    const result = await exerciseSavedRoundTrip("audiobooks", "ab1")
    expect(result).toMatchObject({ reachable: false, mutated: false })
    expect(result.note).toContain("404")
    expect(calls.map((c) => c.method)).toEqual(["GET", "PUT"])
  })

  test("restores via DELETE even when the post-save check fails", async () => {
    queue.push(jsonResponse([false]))
    queue.push(emptyResponse())
    queue.push(jsonResponse([false]))
    queue.push(emptyResponse())
    await expect(exerciseSavedRoundTrip("tracks", "t1")).rejects.toThrow(/did not register/)
    expect(calls.map((c) => c.method)).toEqual(["GET", "PUT", "GET", "DELETE"])
  })
})
