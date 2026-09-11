import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const detoxin = {
  id: "01a06572-95bd-7920-aad9-b86922f5effc",
  type: "world-spell",
  slug: "detoxin",
  title: "Detoxin",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
