import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const luckyGlimmer = {
  id: "01a06572-95d0-7763-8006-abf1d2c6f0d6",
  type: "page-type/world-spell",
  slug: "lucky-glimmer",
  title: "Lucky Glimmer",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.408Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
