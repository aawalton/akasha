import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIiTime = {
  id: "01a0e992-4351-7f72-ac68-f04396e7b3bf",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ii-time",
  title: "Time",
  world: "world/labyrinth-of-the-mad-god",
  description: "The day and hour it is where Nala is, counted in days from the day she came to.",
} as const satisfies WorldMechanic
