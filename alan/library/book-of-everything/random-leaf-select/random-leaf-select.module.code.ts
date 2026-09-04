import type { ProfileStatus } from "../node-profile/node-profile.module.code.ts"

export interface Leaf {
  readonly path: string
  readonly label: string
  readonly status: ProfileStatus
}

export type StatusFilter = "unopened" | "resting" | "any"

export type Rng = (boundExclusive: number) => number

export function filterByStatus(leaves: readonly Leaf[], filter: StatusFilter): readonly Leaf[] {
  if (filter === "any") return leaves
  return leaves.filter((l) => l.status === filter)
}

export function selectWithoutReplacement<T>(
  items: readonly T[],
  count: number,
  rng: Rng
): readonly T[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new Error(`count must be a non-negative integer, got ${count}`)
  }
  const pool = [...items]
  const draws = Math.min(count, pool.length)
  for (let i = 0; i < draws; i++) {
    const span = pool.length - i
    const j = i + rng(span)
    if (j < i || j >= pool.length) {
      throw new Error(`rng returned out-of-range index ${j} for span ${span}`)
    }
    const a = pool[i]
    const b = pool[j]
    if (a === undefined || b === undefined) {
      throw new Error("internal: pool index out of bounds")
    }
    pool[i] = b
    pool[j] = a
  }
  return pool.slice(0, draws)
}
