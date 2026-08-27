import { describe, expect, test } from "bun:test"
import { type BrowserAuthStorage, createBrowserClient } from "./browser"

const URL = "https://example.supabase.co"
const ANON = "anon-key"

function recordingStorage(): { storage: BrowserAuthStorage; reads: readonly string[] } {
  const reads: string[] = []
  const map = new Map<string, string>()
  return {
    reads,
    storage: {
      getItem: (key) => {
        reads.push(key)
        return map.get(key) ?? null
      },
      setItem: (key, value) => {
        map.set(key, value)
      },
      removeItem: (key) => {
        map.delete(key)
      },
    },
  }
}

describe("createBrowserClient — build-variant session store", () => {
  test("capacitor: origin reads the session from the injected storage (not cookies)", async () => {
    const { storage, reads } = recordingStorage()
    const client = createBrowserClient({
      protocol: "capacitor:",
      url: URL,
      anonKey: ANON,
      storage,
    })

    const { data } = await client.auth.getSession()

    expect(data.session).toBeNull()
    expect(reads.some((key) => key.includes("auth-token"))).toBe(true)
  })

  test("http(s) origin constructs the unchanged cookie SSR client", () => {
    const { storage, reads } = recordingStorage()
    const client = createBrowserClient({
      protocol: "https:",
      url: URL,
      anonKey: ANON,
      storage,
    })

    expect(client.auth).toBeDefined()
    expect(reads).toHaveLength(0)
  })
})
