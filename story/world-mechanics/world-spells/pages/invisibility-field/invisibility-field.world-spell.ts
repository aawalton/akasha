import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const invisibilityField = {
  id: "01a06572-95cb-779d-81cc-7278ea7c28f9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "invisibility-field",
  title: "Invisibility Field",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
