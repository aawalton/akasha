import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const telekinesis = {
  id: "01a06572-95e5-7c99-93d9-07e8e049ea35",
  type: "page-type/world-spell",
  slug: "telekinesis",
  title: "Telekinesis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
