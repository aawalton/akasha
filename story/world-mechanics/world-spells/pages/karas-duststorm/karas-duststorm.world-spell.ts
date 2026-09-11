import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const karasDuststorm = {
  id: "01a06572-95cc-7cf1-b9b5-72565165c4a6",
  type: "world-spell",
  slug: "karas-duststorm",
  title: "Karas Duststorm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
