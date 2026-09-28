import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIvSurvival = {
  id: "01a0e9f1-97bd-7d2c-befd-eadecd5e9fa0",
  type: "page-type/world-mechanic",
  slug: "otherwhere-iv-survival",
  title: "Needs",
  world: "world/beware-of-chicken",
  description: "Food, water, sleep and warmth, and what going without them does to a body.",
} as const satisfies WorldMechanic
