import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const encodedMessage = {
  id: "01a06572-95bf-7cc2-8f08-c2aed31d7021",
  type: "world-spell",
  slug: "encoded-message",
  title: "Encoded Message",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
