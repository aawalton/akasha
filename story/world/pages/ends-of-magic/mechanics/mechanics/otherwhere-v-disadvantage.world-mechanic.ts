import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVDisadvantage = {
  id: "01a0e9f8-2dc5-7fde-9692-2083432d174f",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-disadvantage",
  title: "Disadvantage",
  world: "world/ends-of-magic",
  description: "A state Davrar declares for a grown person who has no Talents, classes or skills.",
} as const satisfies WorldMechanic
