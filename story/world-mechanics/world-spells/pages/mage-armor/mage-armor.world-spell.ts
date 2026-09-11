import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mageArmor = {
  id: "01a06572-95d0-7dea-8f6f-2c67f61479bb",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mage-armor",
  title: "Mage Armor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
