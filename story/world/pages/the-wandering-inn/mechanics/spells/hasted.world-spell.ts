import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const hasted = {
  id: "01a06572-95c8-7ec6-9be1-fb406de73f0f",
  type: "page-type/world-spell",
  slug: "hasted",
  title: "Hasted",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.400Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
