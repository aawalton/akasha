import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arrowsOfLight = {
  id: "01a06572-95b5-71cf-b7b5-541408177719",
  type: "page-type/world-spell",
  slug: "arrows-of-light",
  title: "Arrows of Light",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  aliases: ["Arrows…of…Light"],
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
