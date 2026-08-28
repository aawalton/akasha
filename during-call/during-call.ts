import { AsyncLocalStorage } from "node:async_hooks"

/**
 * What one call has already worked out, carried across every await inside it.
 *
 * A CALL IS AN ASYNC TREE, NOT A STACK FRAME. This held the cache in a plain variable and put it
 * back in a `finally`, which ends the moment the function returns — and an async function returns
 * at its first await. Everything after that ran with nothing held, so a reader that awaits anything
 * rebuilt the file tree, the registry and the shape mark on every read: measured on 2026-08-27, one
 * status bar readout group spent 7s across 264 git subprocesses working out cache keys, and paid it
 * again on every refresh. The extension host never opened a call at all, which is the same story
 * with nothing held from the start.
 *
 * NOTHING IS HELD OUTSIDE A CALL. A reader that opened none gets a fresh answer every time, which
 * is what a command run once wants and what keeps a held answer from outliving the files it was
 * taken from.
 */
const calls = new AsyncLocalStorage<Map<string, unknown>>()

/**
 * Runs `run` inside one call, so everything it asks for twice is worked out once.
 *
 * A CALL ALREADY OPEN IS NOT REPLACED. Nesting reuses the outer cache rather than starting a
 * second, so an inner call cannot make the outer one work anything out again.
 */
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
