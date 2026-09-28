import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVTruePower = {
  id: "01a0e9ff-67f6-7985-be5c-1e8f67a42150",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-true-power",
  title: "True Power",
  world: "world/ends-of-magic",
  aliases: ["true powers", "the territory of true power", "Questor-tier"],
  description: "The highest tier of might in Davrar.",
} as const satisfies WorldMechanic
