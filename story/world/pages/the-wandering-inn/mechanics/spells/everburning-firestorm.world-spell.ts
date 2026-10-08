import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const everburningFirestorm = {
  id: "01a06572-95bf-75d7-b621-26ca607a1265",
  type: "page-type/world-spell",
  slug: "everburning-firestorm",
  title: "Everburning Firestorm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
