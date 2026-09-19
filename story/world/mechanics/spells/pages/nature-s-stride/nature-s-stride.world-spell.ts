import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const natureSStride = {
  id: "01a06572-95d9-7cff-9e5b-4952df83c9a5",
  type: "page-type/world-spell",
  slug: "nature-s-stride",
  title: "Nature’s Stride",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
