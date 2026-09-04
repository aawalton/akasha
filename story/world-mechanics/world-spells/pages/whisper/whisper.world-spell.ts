import type { WorldSpell } from "../../world-spell.page-type.ts"

export const whisper = {
  id: "01a06572-95ea-700d-8e90-1ef8a159f425",
  pageTypeSlug: "world-spell",
  slug: "whisper",
  title: "Whisper",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
