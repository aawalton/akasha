import { describe, expect, test } from "bun:test"
import { buildApiRequest } from "./api-fetch"

const ORIGIN = "https://alanwalton.com"

describe("buildApiRequest", () => {
  test("web build: bare path, no Authorization, caller headers preserved", () => {
    const { url, init } = buildApiRequest(
      "/api/save",
      { method: "POST", headers: { "content-type": "application/json" } },
      { native: false, origin: ORIGIN, token: "jwt-abc" }
    )
    expect(url).toBe("/api/save")
    const headers = new Headers(init.headers)
    expect(headers.has("Authorization")).toBe(false)
    expect(headers.get("content-type")).toBe("application/json")
    expect(init.method).toBe("POST")
  })

  test("native shell with a token: origin prefix + Authorization Bearer", () => {
    const { url, init } = buildApiRequest(
      "/api/action",
      { method: "POST", headers: { "content-type": "application/json" } },
      { native: true, origin: ORIGIN, token: "jwt-abc" }
    )
    expect(url).toBe("https://alanwalton.com/api/action")
    const headers = new Headers(init.headers)
    expect(headers.get("Authorization")).toBe("Bearer jwt-abc")
    expect(headers.get("content-type")).toBe("application/json")
    expect(init.method).toBe("POST")
  })

  test("native shell without a token: origin prefix, no Authorization (graceful)", () => {
    const { url, init } = buildApiRequest("/api/awen/read/harem-hotel", undefined, {
      native: true,
      origin: ORIGIN,
      token: null,
    })
    expect(url).toBe("https://alanwalton.com/api/awen/read/harem-hotel")
    const headers = new Headers(init.headers)
    expect(headers.has("Authorization")).toBe(false)
  })
})
