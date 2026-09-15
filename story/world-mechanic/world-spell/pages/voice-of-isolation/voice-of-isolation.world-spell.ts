import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const voiceOfIsolation = {
  id: "01a06572-95e8-74b1-848c-3024efd30b69",
  type: "page-type/world-spell",
  slug: "voice-of-isolation",
  title: "Voice of Isolation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
