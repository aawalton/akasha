import type { WorldSpell } from "../../world-spell.page-type.ts"

export const mageArmor = {
  id: "01a06572-95d0-7dea-8f6f-2c67f61479bb",
  pageTypeSlug: "world-spell",
  slug: "mage-armor",
  title: "Mage Armor",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
