import type { Rng } from "../random-leaf-select/random-leaf-select.module.code.ts"

const STEP = 0x6d2b79f5

const TURN = 4294967296

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
