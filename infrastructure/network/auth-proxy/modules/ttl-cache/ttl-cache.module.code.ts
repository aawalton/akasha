interface CacheEntry<in out V> {
  value: V
  expiresAt: number
}

export interface TTLCache<in out V> {
  get: (key: string) => { value: V } | undefined
  set: (key: string, value: V, ttlMs: number) => void
  readonly size: number
}

export function makeTTLCache<V>(maxEntries: number): TTLCache<V> {
  const store = new Map<string, CacheEntry<V>>()

  return {
    get(key) {
      const entry = store.get(key)
      if (!entry) return undefined
      if (entry.expiresAt <= Date.now()) {
        store.delete(key)
        return undefined
      }
      store.delete(key)
      store.set(key, entry)
      return { value: entry.value }
    },
    set(key, value, ttlMs) {
      if (store.has(key)) {
        store.delete(key)
      } else if (store.size >= maxEntries) {
        const oldest = store.keys().next().value
        if (oldest !== undefined) store.delete(oldest)
      }
      store.set(key, { value, expiresAt: Date.now() + ttlMs })
    },
    get size() {
      return store.size
    },
  }
}

export async function hashKey(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest("SHA-256", bytes)
  const view = new Uint8Array(digest)
  let hex = ""
  for (const byte of view) {
    hex += byte.toString(16).padStart(2, "0")
  }
  return hex
}
