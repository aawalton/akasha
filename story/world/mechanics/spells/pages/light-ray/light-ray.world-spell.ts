import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightRay = {
  id: "01a06572-95ce-7d90-8f34-6acccd63bd8e",
  type: "page-type/world-spell",
  slug: "light-ray",
  title: "Light Ray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
