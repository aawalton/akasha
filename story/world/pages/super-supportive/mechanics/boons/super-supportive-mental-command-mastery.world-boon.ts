import type { WorldBoon } from "akasha/story/world/mechanics/boons/world-boon.page-type.types.ts"

export const superSupportiveMentalCommandMastery = {
  id: "01a0e9f0-79f4-759e-9c0e-1bb2051e5593",
  type: "page-type/world-boon",
  slug: "super-supportive-mental-command-mastery",
  title: "Mental command mastery",
  world: "world/super-supportive",
  description: "The ability to control the System interface by thought alone.",
} as const satisfies WorldBoon
