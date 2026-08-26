let held: Map<string, unknown> | null = null

export function duringOneCall<T>(run: () => T): T {
  const outer = held
  held = outer ?? new Map<string, unknown>()
  try {
    return run()
  } finally {
    held = outer
  }
}

export function onceInCall<T>(key: string, make: () => T): T {
  const cache = held
  if (cache === null) return make()
  if (cache.has(key)) return cache.get(key) as T
  const made = make()
  cache.set(key, made)
  return made
}
