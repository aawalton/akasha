import type { WorldElement } from "akasha/story/world/mechanics/elements/world-element.page-type.types.ts"

export const superSupportiveGround = {
  id: "01a0e9f2-f146-7f91-9303-3a5f811dbc52",
  type: "page-type/world-element",
  slug: "super-supportive-ground",
  title: "Ground",
  world: "world/super-supportive",
  description: "A symbolic element: the fundament of the planet that supports its life.",
} as const satisfies WorldElement
