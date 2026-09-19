import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightsandArrow = {
  id: "01a06572-95d0-7650-b766-e4e67198ed90",
  type: "page-type/world-spell",
  slug: "lightsand-arrow",
  title: "Lightsand Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
