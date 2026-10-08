import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const gustOfAir = {
  id: "01a06572-95c7-705e-b6d1-77572b05f8f7",
  type: "page-type/world-spell",
  slug: "gust-of-air",
  title: "Gust of Air",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.399Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
