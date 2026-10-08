import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const gravityWellReversed = {
  id: "01a06572-95c6-7282-b771-e9758aec464c",
  type: "page-type/world-spell",
  slug: "gravity-well-reversed",
  title: "Gravity Well: Reversed",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
