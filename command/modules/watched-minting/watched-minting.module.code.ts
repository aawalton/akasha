type Said = Readonly<Record<string, unknown>>

export type Watching = {
  readonly key: string
  readonly watches: string
  readonly value: Said
  readonly was: Said | null
  readonly now: number
}

export type Watched = {
  readonly placing: "insert" | "replace"
  readonly said: string
}

function same(one: unknown, two: unknown): boolean {
  return JSON.stringify(one) === JSON.stringify(two)
}

export function watchedFor(over: Watching): Watched | null {
  const { key, watches, value, was, now } = over
  if (was === null) return null
  const kept = was[key]
  const stated = value[key]
  if (same(value[watches], was[watches])) {
    if (stated !== undefined || kept === undefined) return null
    return { placing: "insert", said: JSON.stringify(kept) }
  }
  if (stated !== undefined && !same(stated, kept)) return null
  const minted = JSON.stringify(new Date(now).toISOString())
  return { placing: stated === undefined ? "insert" : "replace", said: minted }
}
