import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const bathhouseConfessionTime = {
  id: "01a10333-9068-70d2-b8d9-57d0e2774570",
  type: "page-type/world-mechanic",
  slug: "bathhouse-confession-time",
  title: "Time",
  world: "world/bathhouse-confession",
  description: "The hour of the one night Rumi, Mira and Zoey spend at the bathhouse.",
} as const satisfies WorldMechanic
