import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const deepSlumber = {
  id: "01a06572-95bc-789f-97a9-ccab47c4edb9",
  type: "page-type/world-spell",
  slug: "deep-slumber",
  title: "Deep Slumber",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.388Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
