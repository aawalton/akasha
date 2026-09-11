import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const adaptiveMessage = {
  id: "01a06572-95b3-764e-b176-f9b05c4dc057",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "adaptive-message",
  title: "Adaptive Message",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
