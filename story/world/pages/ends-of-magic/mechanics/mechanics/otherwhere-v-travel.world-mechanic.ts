import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVTravel = {
  id: "01a0e9fc-7949-7841-a745-5b1f465aff57",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-travel",
  title: "Travel",
  world: "world/ends-of-magic",
  description: "Journeys across Davrar by land, sea and air.",
} as const satisfies WorldMechanic
