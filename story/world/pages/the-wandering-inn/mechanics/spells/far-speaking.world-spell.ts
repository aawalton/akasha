import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const farSpeaking = {
  id: "01a06572-95c0-719f-96a5-963406256cb9",
  type: "page-type/world-spell",
  slug: "far-speaking",
  title: "Far Speaking",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
