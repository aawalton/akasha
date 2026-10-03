import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerAndTheStarTime = {
  id: "01a1033f-b3b5-74ba-a461-f5350989542f",
  type: "page-type/world-mechanic",
  slug: "tower-and-the-star-time",
  title: "Time",
  world: "world/tower-and-the-star",
  description:
    "The day and hour in the Tower, counted from the evening chapter 1 opens on Floor 7, written as 1 January 2000 on the beats' clock because the prose names no calendar date and dates the climb only by months in the Tower.",
} as const satisfies WorldMechanic
