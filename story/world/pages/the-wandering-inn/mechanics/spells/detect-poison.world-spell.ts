import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const detectPoison = {
  id: "01a06572-95bd-73fd-aa2b-5ac559ae4e95",
  type: "page-type/world-spell",
  slug: "detect-poison",
  title: "Detect Poison",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.389Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
