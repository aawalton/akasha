import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveBreezeBearingLeaf = {
  id: "01a0e9f9-7734-7cd6-9e3d-382abb190650",
  type: "page-type/world-spell",
  slug: "super-supportive-breeze-bearing-leaf",
  title: "Breeze Bearing Leaf",
  world: "world/super-supportive",
  description: "A flying spell.",
} as const satisfies WorldSpell
