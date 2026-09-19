import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mageArmor = {
  id: "01a06572-95d0-7dea-8f6f-2c67f61479bb",
  type: "page-type/world-spell",
  slug: "mage-armor",
  title: "Mage Armor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
