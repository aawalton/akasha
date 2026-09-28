import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveInvisibleStaircaseSpell = {
  id: "01a0e9f7-9e6e-7539-adc5-353b1dd15041",
  type: "page-type/world-spell",
  slug: "super-supportive-invisible-staircase-spell",
  title: "invisible staircase spell",
  world: "world/super-supportive",
  description: "A wizard spell that makes its targets climb invisible stairs up into the air.",
} as const satisfies WorldSpell
