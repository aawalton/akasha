import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const volcanicSmokescreen = {
  id: "01a06572-95e8-7480-8435-76a808d2acad",
  type: "world-spell",
  slug: "volcanic-smokescreen",
  title: "Volcanic Smokescreen",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
