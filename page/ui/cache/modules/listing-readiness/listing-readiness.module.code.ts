interface AnsweredListings {
  readonly has: (key: string) => boolean
  readonly answer: (key: string) => undefined
}

export function createAnsweredListings(): AnsweredListings {
  const answered = new Set<string>()
  return {
    has: (key) => answered.has(key),
    answer: (key) => {
      answered.add(key)
      return undefined
    },
  }
}

export const ANSWERED_LISTINGS: AnsweredListings = createAnsweredListings()

export function answeredAll(answered: AnsweredListings, keys: readonly string[]): boolean {
  return keys.every((key) => answered.has(key))
}

export interface HeldSnapshots<R> {
  readonly get: (key: string) => R | undefined
  readonly hold: (key: string, snapshot: R) => undefined
}

export function createHeldSnapshots<R>(limit: number): HeldSnapshots<R> {
  const held = new Map<string, R>()
  return {
    get: (key) => held.get(key),
    hold: (key, snapshot) => {
      held.delete(key)
      held.set(key, snapshot)
      for (const oldest of held.keys()) {
        if (held.size <= limit) break
        held.delete(oldest)
      }
      return undefined
    },
  }
}
