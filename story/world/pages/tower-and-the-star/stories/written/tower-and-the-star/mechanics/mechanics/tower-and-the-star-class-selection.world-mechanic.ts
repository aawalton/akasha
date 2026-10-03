import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerAndTheStarClassSelection = {
  id: "01a1033f-b3b5-7a8d-87c3-486bda3624d3",
  type: "page-type/world-mechanic",
  slug: "tower-and-the-star-class-selection",
  title: "Class Selection",
  world: "world/tower-and-the-star",
  description:
    "Each climber has held a class since Month 1. Class Selection, reached by defeating the Floor 10 Major Boss, confirms each climber's class as its Advanced-tier designation.",
} as const satisfies WorldMechanic
