import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiPrayer = {
  id: "01a0ea83-0cf8-7286-8775-1992690551b9",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-prayer",
  title: "Prayer",
  description: "Speaking to a god.",
  world: "world/the-calamitous-bob-stubbed",
} as const satisfies WorldMechanic
