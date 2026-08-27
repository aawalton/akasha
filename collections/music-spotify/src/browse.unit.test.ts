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
  attemptDeprecated,
  categoriesResponseSchema,
  categorySchema,
  getAllCategories,
  getCategories,
  getCategory,
  getNewReleases,
  newReleasesResponseSchema,
} from "./endpoints/browse"

function fakeResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function offsetPage(items: readonly unknown[], next: string | null) {
  return { items, total: items.length, limit: items.length, offset: 0, next, previous: null }
}

const originalFetch = globalThis.fetch
let queue: Response[] = []
let calls: string[] = []

beforeEach(() => {
  queue = []
  calls = []
  const handler = (input: Parameters<typeof fetch>[0]): Promise<Response> => {
    const url = String(input)
    calls.push(url)
    const next = queue.shift()
    if (next === undefined) throw new Error(`unexpected fetch: ${url}`)
    return Promise.resolve(next)
  }
  globalThis.fetch = Object.assign(handler, { preconnect: () => {} })
})

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe("schemas", () => {
  test("categorySchema parses a category and keeps unknown keys", () => {
    const c = categorySchema.parse({
      id: "0JQ5",
      name: "Top Lists",
      icons: [{ url: "http://x", height: 100, width: 100 }],
      future: true,
    })
    expect(c.id).toBe("0JQ5")
    expect(c.icons?.[0]?.url).toBe("http://x")
  })

  test("categoriesResponseSchema parses the categories wrapper", () => {
    const r = categoriesResponseSchema.parse({
      categories: offsetPage([{ id: "a", name: "A" }], null),
    })
    expect(r.categories.items[0]?.id).toBe("a")
  })

  test("newReleasesResponseSchema parses the albums wrapper", () => {
    const r = newReleasesResponseSchema.parse({
      albums: offsetPage([{ id: "al", name: "Album", album_type: "single" }], null),
    })
    expect(r.albums.items[0]?.name).toBe("Album")
  })
})

describe("getCategories / getCategory / getNewReleases", () => {
  test("getCategories issues a GET and parses", async () => {
    queue.push(fakeResponse({ categories: offsetPage([{ id: "c1", name: "C1" }], null) }))
    const r = await getCategories({ limit: 10 })
    expect(r.categories.items[0]?.id).toBe("c1")
    expect(calls[0]).toContain("/browse/categories?limit=10")
  })

  test("getCategory encodes the id into the path", async () => {
    queue.push(fakeResponse({ id: "0JQ5", name: "Top Lists" }))
    const c = await getCategory("0JQ5")
    expect(c.name).toBe("Top Lists")
    expect(calls[0]).toContain("/browse/categories/0JQ5")
  })

  test("getNewReleases parses the albums wrapper", async () => {
    queue.push(fakeResponse({ albums: offsetPage([{ id: "al", name: "Album" }], null) }))
    const r = await getNewReleases({ limit: 10 })
    expect(r.albums.items).toHaveLength(1)
    expect(calls[0]).toContain("/browse/new-releases?limit=10")
  })

  test("throws on a non-ok status", async () => {
    queue.push(fakeResponse({ error: { status: 500 } }, 500))
    await expect(getCategories()).rejects.toThrow(/500/)
  })
})

describe("getAllCategories", () => {
  test("follows categories.next across pages", async () => {
    queue.push(
      fakeResponse({
        categories: offsetPage(
          [{ id: "c1", name: "C1" }],
          "https://api.spotify.com/v1/browse/categories?offset=1&limit=50"
        ),
      })
    )
    queue.push(fakeResponse({ categories: offsetPage([{ id: "c2", name: "C2" }], null) }))
    const all = await getAllCategories()
    expect(all.map((c) => c.id)).toEqual(["c1", "c2"])
    expect(calls).toHaveLength(2)
  })
})

describe("attemptDeprecated", () => {
  test("records works when the endpoint still returns data", async () => {
    queue.push(fakeResponse({ playlists: offsetPage([], null) }))
    const r = await attemptDeprecated("/browse/featured-playlists?limit=10")
    expect(r.outcome).toBe("works")
  })

  test("records deprecated on a 403", async () => {
    queue.push(fakeResponse({ error: { status: 403 } }, 403))
    const r = await attemptDeprecated("/browse/featured-playlists?limit=10")
    expect(r).toEqual({ outcome: "deprecated", status: 403 })
  })

  test("records deprecated on a 404", async () => {
    queue.push(fakeResponse({ error: { status: 404 } }, 404))
    const r = await attemptDeprecated("/browse/categories/0JQ5/playlists")
    expect(r).toEqual({ outcome: "deprecated", status: 404 })
  })

  test("rethrows an unexpected error (500)", async () => {
    queue.push(fakeResponse({ error: { status: 500 } }, 500))
    await expect(attemptDeprecated("/browse/featured-playlists")).rejects.toThrow(/500/)
  })
})
