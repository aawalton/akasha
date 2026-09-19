import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cleansed = {
  id: "01a06572-95b9-7d15-8dc6-df23dac9be4b",
  type: "page-type/world-spell",
  slug: "cleansed",
  title: "Cleansed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
