import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const whisper = {
  id: "01a06572-95ea-700d-8e90-1ef8a159f425",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "whisper",
  title: "Whisper",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
