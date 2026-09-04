import type { Derived, Sheet } from "../combat-types/combat-types.module.code.ts"

export function derive(s: Sheet): Derived {
  const a = s.attributes
  const wpn = s.equipment?.weapon?.atk ?? 0
  const arm = s.equipment?.armor?.def ?? 0
  return {
    hpMax: Math.round(a.VITALITY * 8 + a.MIGHT * 2),
    stamMax: Math.round(a.VITALITY * 4 + a.FINESSE * 2),
    focusMax: Math.round(a.INTELLECT * 4 + a.WILL * 2),
    initiative: a.PERCEPTION + a.FINESSE,
    physAtk: a.MIGHT * 1.5 + a.FINESSE + wpn,
    physDef: (a.VITALITY + a.FINESSE) / 2 + arm,
    mentDef: a.WILL * 1.5 + a.INTELLECT * 0.5,
  }
}
