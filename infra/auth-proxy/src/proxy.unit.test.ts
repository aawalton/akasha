import { afterEach, describe, expect, test } from "bun:test"

import type { Identity } from "./auth"
import { proxyRequest } from "./proxy"

const IDENTITY: Identity = {
  sub: "user-123",
  email: "u@example.com",
  name: "User",
}

const originalFetch = globalThis.fetch

type FetchInit = BunFetchRequestInit

afterEach(() => {
  globalThis.fetch = originalFetch
})

function recordFetch() {
  const calls: FetchInit[] = []
  const impl = (_input: string | URL | Request, init?: RequestInit): Promise<Response> => {
    calls.push(init ?? {})
    return Promise.resolve(new Response(null, { status: 200 }))
  }
  globalThis.fetch = Object.assign(impl, { preconnect: originalFetch.preconnect })
  return { calls }
}

describe("proxyRequest", () => {
  test("passes the proxy option to fetch when a proxy is provided", async () => {
    const recorder = recordFetch()
    const req = new Request("http://host.example.com/path")

    await proxyRequest(req, "http://upstream:80", IDENTITY, "http://egress:1055")

    expect(recorder.calls).toHaveLength(1)
    expect(recorder.calls[0]?.proxy).toBe("http://egress:1055")
  })

  test("does not set a proxy option when none is provided", async () => {
    const recorder = recordFetch()
    const req = new Request("http://host.example.com/path")

    await proxyRequest(req, "http://upstream:80", IDENTITY)

    expect(recorder.calls).toHaveLength(1)
    const init = recorder.calls[0]
    expect(init !== undefined && "proxy" in init).toBe(false)
  })

  test("forwards identity headers and keeps decompress/redirect options", async () => {
    const recorder = recordFetch()
    const req = new Request("http://host.example.com/path")

    await proxyRequest(req, "http://upstream:80", IDENTITY)

    const init = recorder.calls[0]
    expect(init?.redirect).toBe("manual")
    expect(init?.decompress).toBe(false)
    const headers = new Headers(init?.headers)
    expect(headers.get("X-Forwarded-User")).toBe("user-123")
    expect(headers.get("X-Forwarded-Email")).toBe("u@example.com")
    expect(headers.get("X-Forwarded-Name")).toBe("User")
  })
})
