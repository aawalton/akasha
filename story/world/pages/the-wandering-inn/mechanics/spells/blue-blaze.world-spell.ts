import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blueBlaze = {
  id: "01a06572-95b6-7ce0-955c-88b639f0440d",
  type: "page-type/world-spell",
  slug: "blue-blaze",
  title: "Blue Blaze",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.382Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
