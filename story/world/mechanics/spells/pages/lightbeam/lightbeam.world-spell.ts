import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightbeam = {
  id: "01a06572-95cf-71d9-81d0-5aae5477cabc",
  type: "page-type/world-spell",
  slug: "lightbeam",
  title: "Lightbeam",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
