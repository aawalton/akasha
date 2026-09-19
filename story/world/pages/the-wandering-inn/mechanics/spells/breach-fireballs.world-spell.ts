import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const breachFireballs = {
  id: "01a06572-95b7-76be-b44e-defb7499e11f",
  type: "page-type/world-spell",
  slug: "breach-fireballs",
  title: "Breach Fireballs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
