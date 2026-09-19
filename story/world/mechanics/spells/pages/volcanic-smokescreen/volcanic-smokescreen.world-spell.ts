import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const volcanicSmokescreen = {
  id: "01a06572-95e8-7480-8435-76a808d2acad",
  type: "page-type/world-spell",
  slug: "volcanic-smokescreen",
  title: "Volcanic Smokescreen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
