import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiInterface = {
  id: "01a0ea74-9df7-7d7f-a0c3-28f2cc0f6bf3",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-interface",
  title: "The Interface",
  world: "world/the-calamitous-bob-stubbed",
  description: "A window of words and numbers that shows a person their own magic.",
} as const satisfies WorldMechanic
