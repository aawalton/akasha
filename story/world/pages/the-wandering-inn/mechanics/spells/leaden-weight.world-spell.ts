import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const leadenWeight = {
  id: "01a06572-95cc-7af6-b487-88267bdb1378",
  type: "page-type/world-spell",
  slug: "leaden-weight",
  title: "Leaden Weight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
