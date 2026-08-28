import { AsyncLocalStorage } from "node:async_hooks"

const calls = new AsyncLocalStorage<Map<string, unknown>>()

export function duringOneCall<T>(run: () => T): T {
  const outer = calls.getStore()
  if (outer !== undefined) return run()
  return calls.run(new Map<string, unknown>(), run)
}

export function onceInCall<T>(key: string, make: () => T): T {
  const cache = calls.getStore()
  if (cache === undefined) return make()
  if (cache.has(key)) return cache.get(key) as T
  const made = make()
  cache.set(key, made)
  return made
}

export function holdInCall<T>(key: string, value: T): void {
  calls.getStore()?.set(key, value)
}
