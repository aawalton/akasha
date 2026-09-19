import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const muffle = {
  id: "01a06572-95d9-74c0-bc98-ba2d3f895dd6",
  type: "page-type/world-spell",
  slug: "muffle",
  title: "Muffle",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
