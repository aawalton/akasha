import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerAndTheStarKills = {
  id: "01a1033f-b3b5-72d0-b0a7-77b0c1e69b2c",
  type: "page-type/world-mechanic",
  slug: "tower-and-the-star-kills",
  title: "Kills",
  world: "world/tower-and-the-star",
  description:
    "The System counts a floor's kills as enemies defeated over the floor's total. Killing every one is a Full Clear, a bonus objective with its own reward.",
  createdAt: "2026-10-03T19:31:08.853Z",
  updatedAt: "2026-10-03T19:31:12.000Z",
} as const satisfies WorldMechanic
