import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const slow = {
  id: "01a06572-95e1-72e3-b893-bc2ecc9fc448",
  type: "page-type/world-spell",
  slug: "slow",
  title: "Slow",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
