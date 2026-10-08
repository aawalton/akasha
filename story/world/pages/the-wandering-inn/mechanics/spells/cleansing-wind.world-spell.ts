import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cleansingWind = {
  id: "01a06572-95b9-742a-89e4-c63dec92826d",
  type: "page-type/world-spell",
  slug: "cleansing-wind",
  title: "Cleansing Wind",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.385Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
