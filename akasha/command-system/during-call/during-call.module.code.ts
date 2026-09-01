import { AsyncLocalStorage } from "node:async_hooks"

const calls = new AsyncLocalStorage<Map<string, unknown>>()

export function duringOneCall<T>(run: () => T): T {
  const outer = calls.getStore()
  if (outer !== undefined) return run()
  return calls.run(new Map<string, unknown>(), run)
}

export function onceInCall<T>(key: string, make: () => T): T {
  const held = calls.getStore()
  if (held === undefined) return make()
  if (held.has(key)) return held.get(key) as T
  const made = make()
  held.set(key, made)
  return made
}

export function holdInCall<T>(key: string, value: T): undefined {
  calls.getStore()?.set(key, value)
}
