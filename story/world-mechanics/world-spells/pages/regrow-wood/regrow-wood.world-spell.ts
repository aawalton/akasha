import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const regrowWood = {
  id: "01a06572-95dc-7a05-bf9f-0668a827dca9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "regrow-wood",
  title: "Regrow Wood",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
