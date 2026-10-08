import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const autocast = {
  id: "01a06572-95b5-7593-ac6b-93cbb70d8780",
  type: "page-type/world-spell",
  slug: "autocast",
  title: "Autocast",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
