import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportivePlacementTesting = {
  id: "01a0e9f2-f0a2-7a9c-aec3-7453deaade67",
  type: "page-type/world-mechanic",
  slug: "super-supportive-placement-testing",
  title: "Placement testing",
  world: "world/super-supportive",
  description: "Tests that set a student's grade level.",
} as const satisfies WorldMechanic
