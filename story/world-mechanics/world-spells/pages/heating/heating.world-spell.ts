import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const heating = {
  id: "01a06572-95c8-73e3-8f8f-20f281512ecc",
  type: "world-spell",
  slug: "heating",
  title: "Heating",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
