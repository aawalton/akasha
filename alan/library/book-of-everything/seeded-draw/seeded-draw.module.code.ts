import type { ProfileStatus } from "../topic-tree/topic-tree.module.code.ts"

const STEP = 0x6d2b79f5

const TURN = 4294967296

export interface Leaf {
  readonly path: string
  readonly label: string
  readonly status: ProfileStatus
}

export type Rng = (boundExclusive: number) => number

export function drawsFromSeed(seed: number): Rng {
  let held = seed | 0
  return (boundExclusive: number): number => {
    if (!Number.isInteger(boundExclusive) || boundExclusive < 1) {
      throw new Error(`bound must be a whole number of one or more, got ${boundExclusive}`)
    }
    held = (held + STEP) | 0
    let mixed = Math.imul(held ^ (held >>> 15), 1 | held)
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed
    return Math.floor((((mixed ^ (mixed >>> 14)) >>> 0) / TURN) * boundExclusive)
  }
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
