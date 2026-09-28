import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const otherwhereViiFlux = {
  id: "01a0ea41-c76b-772d-aa6a-0f49c31f994f",
  type: "page-type/world-condition",
  slug: "otherwhere-vii-flux",
  title: "Flux",
  world: "world/god-of-trash",
  description: "A griping sickness of the bowels from foul water or spoiled food.",
} as const satisfies WorldCondition
