import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lanternLight = {
  id: "01a06572-95cc-7393-8bd1-31c159d163c4",
  type: "page-type/world-spell",
  slug: "lantern-light",
  title: "Lantern Light",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
