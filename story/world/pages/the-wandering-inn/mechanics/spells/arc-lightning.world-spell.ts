import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const arcLightning = {
  id: "01a06572-95b4-7fb3-87e0-57555f843183",
  type: "page-type/world-spell",
  slug: "arc-lightning",
  title: "Arc Lightning",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.380Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
