import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theBeholderHarvestCadence = {
  id: "01a0deed-6021-7d35-a65a-ad06c176f402",
  type: "page-type/world-mechanic",
  slug: "the-beholder-harvest-cadence",
  title: "Harvest Cadence",
  world: "world/the-beholder",
  description:
    "Every chapter runs a kill, then the top-three menu, then the reader's pick. An unpowered victim offers three attributes, and an Awakened victim offers attributes with a possible power. A chapter with several victims asks for one pick per victim.",
} as const satisfies WorldMechanic
