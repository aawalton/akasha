import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const gravityWellReversed = {
  id: "01a06572-95c6-7282-b771-e9758aec464c",
  type: "page-type/world-spell",
  slug: "gravity-well-reversed",
  title: "Gravity Well: Reversed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
