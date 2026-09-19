import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfMetalIron = {
  id: "01a06572-95e9-77e9-b605-b84a4b4de846",
  type: "page-type/world-spell",
  slug: "wall-of-metal-iron",
  title: "Wall of Metal: Iron",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
