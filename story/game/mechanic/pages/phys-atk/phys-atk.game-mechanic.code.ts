import {
  type Reading,
  type Summed,
  summed,
  type Term,
} from "akasha/story/game/mechanic/modules/linear-stat/linear-stat.module.code.ts"

const TERMS: readonly Term[] = [
  { of: "might", by: 1.5 },
  { of: "finesse", by: 1 },
  { of: "weapon.atk", by: 1 },
]

export function runMechanic(reading: Reading): Summed {
  return summed({ terms: TERMS, constant: 0, rounding: "none", held: reading.held })
}
