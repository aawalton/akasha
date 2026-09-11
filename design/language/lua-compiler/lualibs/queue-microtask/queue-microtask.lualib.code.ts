declare function zo_callLater(this: void, fn: (this: void) => void, ms: number): undefined

export function __TS__QueueMicrotask(this: void, fn: (this: void) => void): undefined {
  zo_callLater(fn, 0)
}
