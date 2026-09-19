import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfSteel = {
  id: "01a06572-95e9-7f4d-b263-448bdc304034",
  type: "page-type/world-spell",
  slug: "wall-of-steel",
  title: "Wall of Steel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
