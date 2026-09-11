import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const frictionlessSurface = {
  id: "01a06572-95c5-7ede-aad9-b157e347a52e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "frictionless-surface",
  title: "Frictionless Surface",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
