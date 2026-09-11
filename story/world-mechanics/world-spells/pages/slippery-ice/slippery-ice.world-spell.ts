import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const slipperyIce = {
  id: "01a06572-95e1-7157-8ca6-eef1ec76736f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "slippery-ice",
  title: "Slippery Ice",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
