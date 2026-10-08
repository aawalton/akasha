import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const smokescreen = {
  id: "01a06572-95e1-7849-a41d-141f64d629bf",
  type: "page-type/world-spell",
  slug: "smokescreen",
  title: "Smokescreen",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
