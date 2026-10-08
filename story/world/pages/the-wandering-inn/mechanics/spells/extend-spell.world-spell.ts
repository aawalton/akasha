import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const extendSpell = {
  id: "01a06572-95bf-796f-ae6e-5a07e8988084",
  type: "page-type/world-spell",
  slug: "extend-spell",
  title: "Extend Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
