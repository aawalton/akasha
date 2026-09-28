import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveWardrobeChange = {
  id: "01a0e9f2-f149-79ca-944e-7e7bcfba0cb3",
  type: "page-type/world-spell",
  slug: "super-supportive-wardrobe-change",
  title: "Wardrobe Change",
  world: "world/super-supportive",
  description: "A Rabbit class spell that swaps gear bought from the Wardrobe.",
} as const satisfies WorldSpell
