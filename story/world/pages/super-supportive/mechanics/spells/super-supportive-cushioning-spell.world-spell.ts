import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveCushioningSpell = {
  id: "01a0e9f7-9e6d-74aa-8f46-a14d7bc2aa88",
  type: "page-type/world-spell",
  slug: "super-supportive-cushioning-spell",
  title: "cushioning spell",
  world: "world/super-supportive",
  description: "A wizard spell that makes a seat like a slowly sinking marshmallow.",
} as const satisfies WorldSpell
