import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const handOfTheSpectralGiant = {
  id: "01a06572-95c8-7928-9bf6-8a4a2479581a",
  type: "page-type/world-spell",
  slug: "hand-of-the-spectral-giant",
  title: "Hand of the Spectral Giant",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.400Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
