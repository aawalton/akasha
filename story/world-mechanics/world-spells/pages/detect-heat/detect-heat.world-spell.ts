import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const detectHeat = {
  id: "01a06572-95bc-75a6-87f2-edce7001f7f6",
  type: "world-spell",
  slug: "detect-heat",
  title: "Detect Heat",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
