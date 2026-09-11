import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightfoldArmor = {
  id: "01a06572-95cf-741e-b784-0ad2492a45aa",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lightfold-armor",
  title: "Lightfold Armor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
