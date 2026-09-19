import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const tripgrass = {
  id: "01a06572-95e7-7b36-9e08-e676c93c622c",
  type: "page-type/world-spell",
  slug: "tripgrass",
  title: "Tripgrass",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
