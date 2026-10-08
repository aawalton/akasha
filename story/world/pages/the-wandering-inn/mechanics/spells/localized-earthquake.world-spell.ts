import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const localizedEarthquake = {
  id: "01a06572-95d0-7df4-94ae-433d4b40d753",
  type: "page-type/world-spell",
  slug: "localized-earthquake",
  title: "Localized Earthquake",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.408Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
