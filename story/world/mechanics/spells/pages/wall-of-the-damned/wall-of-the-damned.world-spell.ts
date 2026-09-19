import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfTheDamned = {
  id: "01a06572-95e9-75d8-a63f-089e1a206535",
  type: "page-type/world-spell",
  slug: "wall-of-the-damned",
  title: "Wall of the Damned",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
