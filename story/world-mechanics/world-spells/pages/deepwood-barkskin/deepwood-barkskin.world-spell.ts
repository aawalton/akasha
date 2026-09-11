import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const deepwoodBarkskin = {
  id: "01a06572-95bc-74e2-a1cc-ef8696e6907a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "deepwood-barkskin",
  title: "Deepwood Barkskin",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
