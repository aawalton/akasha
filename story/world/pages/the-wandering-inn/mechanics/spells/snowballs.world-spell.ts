import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const snowballs = {
  id: "01a06572-95e1-7aee-aab2-b4447601ff04",
  type: "page-type/world-spell",
  slug: "snowballs",
  title: "Snowballs",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
