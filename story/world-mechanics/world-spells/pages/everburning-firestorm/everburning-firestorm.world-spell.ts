import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const everburningFirestorm = {
  id: "01a06572-95bf-75d7-b621-26ca607a1265",
  type: "world-spell",
  slug: "everburning-firestorm",
  title: "Everburning Firestorm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
