import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const restoration = {
  id: "01a06572-95dd-7bd9-85c2-2795fb8efe58",
  type: "world-spell",
  slug: "restoration",
  title: "Restoration",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
