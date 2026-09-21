import {
  type Summed,
  summed,
  type Term,
} from "akasha/story/game/mechanic/modules/linear-stat/linear-stat.module.code.ts"

const TERMS: readonly Term[] = [
  { of: "might", by: 1.5 },
  { of: "finesse", by: 1 },
  { of: "weapon.atk", by: 1 },
]

export type Asking = { readonly held: Readonly<Record<string, number>> }

export function runMechanic(asking: Asking): Summed {
  return summed({ terms: TERMS, constant: 0, rounding: "none", held: asking.held })
}
