import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const aKingSTruth = {
  id: "01a06572-95b2-7cb5-8596-d82b85b4626c",
  type: "page-type/world-spell",
  slug: "a-king-s-truth",
  title: "A King’s Truth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
