import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const reduceWeight = {
  id: "01a06572-95dc-7b69-bee3-7ae07dc51108",
  type: "page-type/world-spell",
  slug: "reduce-weight",
  title: "Reduce Weight",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.420Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
