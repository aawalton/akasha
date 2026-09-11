import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const isolationBubble = {
  id: "01a06572-95cc-7a24-875c-030c7f2d5ec0",
  type: "world-spell",
  slug: "isolation-bubble",
  title: "Isolation Bubble",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
