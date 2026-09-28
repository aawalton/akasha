import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVSurvival = {
  id: "01a0e9f1-fcd4-7dfc-94e0-874ccf06a11e",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-survival",
  title: "Survival",
  world: "world/ends-of-magic",
  description: "Thirst, hunger, cold and want of sleep.",
} as const satisfies WorldMechanic
