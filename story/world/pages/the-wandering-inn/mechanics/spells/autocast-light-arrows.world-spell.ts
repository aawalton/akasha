import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const autocastLightArrows = {
  id: "01a06572-95b5-72a5-bcd5-a3505ec117f5",
  type: "page-type/world-spell",
  slug: "autocast-light-arrows",
  title: "Autocast: Light Arrows",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
