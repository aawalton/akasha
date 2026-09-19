import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const covertAngle = {
  id: "01a06572-95bb-7ba1-acb6-17dbc3cfebb3",
  type: "page-type/world-spell",
  slug: "covert-angle",
  title: "Covert Angle",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
