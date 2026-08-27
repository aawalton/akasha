import { afterAll, afterEach, beforeAll, describe, expect, mock, test } from "bun:test"
import { getCurrentUser, getUserProfile } from "./endpoints/users"

mock.module("./oauth", () => ({
  getCredentials: () => ({ clientId: "x", clientSecret: "y", redirectUri: "z" }),
  basicAuthHeader: () => "Basic xyz",
  parseTokenResponse: async () => ({ access_token: "t" }),
  persistTokenResponse: () => ({ accessToken: "t", scopes: [], expiresAt: 0, refreshToken: "r" }),
  forceRefresh: async () => ({ accessToken: "t", scopes: [], expiresAt: 0, refreshToken: "r" }),
  getOAuthAccessToken: async () => "test-access-token",
}))

const realFetch = globalThis.fetch

interface FetchCall {
  readonly url: string
  readonly init: Parameters<typeof fetch>[1]
}

let calls: FetchCall[] = []
let respStatus = 200
let respBody: unknown = {}

const mockFetch: typeof fetch = Object.assign(
  (input: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
    calls.push({ url: String(input), init })
    return Promise.resolve(new Response(JSON.stringify(respBody), { status: respStatus }))
  },
  { preconnect: realFetch.preconnect }
)

function stubFetch(status: number, body: unknown) {
  respStatus = status
  respBody = body
}

beforeAll(() => {
  globalThis.fetch = mockFetch
})

afterEach(() => {
  calls = []
})

afterAll(() => {
  globalThis.fetch = realFetch
})

describe("getCurrentUser", () => {
  test("parses the current user's profile and hits /me with a bearer token", async () => {
    stubFetch(200, {
      id: "alan",
      display_name: "Alan",
      email: "alan@example.com",
      external_urls: { spotify: "https://open.spotify.com/user/alan" },
      country: "US",
    })
    const user = await getCurrentUser()
    expect(user.id).toBe("alan")
    expect(user.email).toBe("alan@example.com")
    expect(calls[0]?.url).toBe("https://api.spotify.com/v1/me")
    const auth = new Headers(calls[0]?.init?.headers).get("Authorization")
    expect(auth).toBe("Bearer test-access-token")
  })

  test("preserves unknown keys via passthrough", async () => {
    stubFetch(200, {
      id: "alan",
      display_name: null,
      external_urls: { spotify: "https://open.spotify.com/user/alan" },
      product: "premium",
    })
    const user = await getCurrentUser()
    expect(user).toMatchObject({ product: "premium" })
    expect(user.display_name).toBeNull()
  })
})

describe("getUserProfile", () => {
  test("fetches a public profile and URL-encodes the user id", async () => {
    stubFetch(200, {
      id: "spotify user",
      display_name: "Spotify",
      external_urls: { spotify: "https://open.spotify.com/user/spotify" },
      followers: { href: null, total: 1000 },
      images: [{ url: "https://i.scdn.co/x.jpg", height: 300, width: 300 }],
      type: "user",
      uri: "spotify:user:spotify",
    })
    const user = await getUserProfile("spotify user")
    expect(user.id).toBe("spotify user")
    expect(user.followers?.total).toBe(1000)
    expect(calls[0]?.url).toBe("https://api.spotify.com/v1/users/spotify%20user")
  })

  test("throws on a non-2xx response", async () => {
    stubFetch(404, { error: { status: 404, message: "Not found." } })
    await expect(getUserProfile("does-not-exist")).rejects.toThrow(/404/)
  })

  test("throws on a shape mismatch (missing required id)", async () => {
    stubFetch(200, { display_name: "No Id" })
    await expect(getUserProfile("bad")).rejects.toThrow()
  })
})
