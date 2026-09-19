import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const purifyWater = {
  id: "01a06572-95db-703b-854e-cb211089fcb4",
  type: "page-type/world-spell",
  slug: "purify-water",
  title: "Purify Water",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
