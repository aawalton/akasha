import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const groundswim = {
  id: "01a06572-95c7-73d3-add8-ef5a19c2fd8a",
  type: "page-type/world-spell",
  slug: "groundswim",
  title: "Groundswim",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
