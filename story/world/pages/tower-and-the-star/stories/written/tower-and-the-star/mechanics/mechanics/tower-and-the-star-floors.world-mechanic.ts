import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerAndTheStarFloors = {
  id: "01a1033f-b3b5-75ab-a9fe-30c5ffe6057a",
  type: "page-type/world-mechanic",
  slug: "tower-and-the-star-floors",
  title: "Floors",
  world: "world/tower-and-the-star",
  description:
    "The Tower is climbed floor by floor. A floor holds chambers, enemies and rest nodes, and often a boss; a Transition Hall lies between one floor and the next. Floors are grouped in sections, Floors 11 to 30 and then Section 31 to 50, and the System marks a floor cleared and a section clear.",
} as const satisfies WorldMechanic
