import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const scry = {
  id: "01a06572-95de-75b4-83a0-27636ed20298",
  type: "world-spell",
  slug: "scry",
  title: "Scry",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
