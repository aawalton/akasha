import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const slowFall = {
  id: "01a06572-95e1-751a-b401-ec050c458dee",
  type: "page-type/world-spell",
  slug: "slow-fall",
  title: "Slow Fall",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
