export interface ListenerSet {
  readonly tell: () => undefined
  readonly subscribe: (listener: () => void) => () => void
}

export function listenerSet(): ListenerSet {
  const listeners = new Set<() => void>()
  return {
    tell: (): undefined => {
      for (const listener of listeners) listener()
    },
    subscribe: (listener: () => void): (() => void) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}
