import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const aquaticSinkhole = {
  id: "01a06572-95b4-74e0-b852-657a42217a61",
  type: "world-spell",
  slug: "aquatic-sinkhole",
  title: "Aquatic Sinkhole",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
