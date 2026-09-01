import type { Roll, Sheet } from "../combat-types/combat-types.module.code.ts"

export function rng(seed: number): () => number {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let x = Math.imul(t ^ (t >>> 15), 1 | t)
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

export function roll2d10(next: () => number): Roll {
  const d1 = 1 + Math.floor(next() * 10)
  const d2 = 1 + Math.floor(next() * 10)
  const total = d1 + d2
  return { mode: "2d10", dice: [d1, d2], total, crit: total === 20, fumble: total === 2 }
}

export function roll1d20(next: () => number): Roll {
  const d = 1 + Math.floor(next() * 20)
  return { mode: "1d20", dice: [d], total: d, crit: d === 20, fumble: d === 1 }
}

export function rollFor(s: Sheet, next: () => number): Roll {
  return (s.rollMode ?? "2d10") === "1d20" ? roll1d20(next) : roll2d10(next)
}
