import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const coolingWind = {
  id: "01a06572-95bb-723c-bfa7-a5e0f3e8df19",
  type: "page-type/world-spell",
  slug: "cooling-wind",
  title: "Cooling Wind",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
