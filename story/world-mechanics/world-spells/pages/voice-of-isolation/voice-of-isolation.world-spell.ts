import type { WorldSpell } from "../../world-spell.page-type.ts"

export const voiceOfIsolation = {
  id: "01a06572-95e8-74b1-848c-3024efd30b69",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "voice-of-isolation",
  title: "Voice of Isolation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
