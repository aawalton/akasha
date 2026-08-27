export type RequestMemo<T> = {
  get: (request: Request, factory: () => T) => T
}

export function createRequestMemo<T>(): RequestMemo<T> {
  const cache = new WeakMap<Request, { value: T }>()
  return {
    get(request: Request, factory: () => T): T {
      const hit = cache.get(request)
      if (hit) return hit.value
      const entry = { value: factory() }
      cache.set(request, entry)
      return entry.value
    },
  }
}
