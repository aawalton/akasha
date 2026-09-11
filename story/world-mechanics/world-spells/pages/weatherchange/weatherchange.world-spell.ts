import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const weatherchange = {
  id: "01a06572-95e9-768e-b65d-d3b8131a9b7e",
  type: "world-spell",
  slug: "weatherchange",
  title: "Weatherchange",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
