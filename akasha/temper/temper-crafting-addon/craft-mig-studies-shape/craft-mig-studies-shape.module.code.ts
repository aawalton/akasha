import { STATE } from "../crafting-state/crafting-state.module.code.ts"

export function migrateStudiesShape(): undefined {
  const studies = STATE.Account.crafting.studies
  for (const [char, entry] of pairs(studies)) {
    if (!istable(entry)) {
      studies[char] = {}
    }
  }
}
