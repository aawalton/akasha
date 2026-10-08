import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const groundswim = {
  id: "01a06572-95c7-73d3-add8-ef5a19c2fd8a",
  type: "page-type/world-spell",
  slug: "groundswim",
  title: "Groundswim",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.399Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
