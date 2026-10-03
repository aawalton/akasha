import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const thePlacesSheCarriesTime = {
  id: "01a10337-ad0b-7b0c-a7b7-463b0a032874",
  type: "page-type/world-mechanic",
  slug: "the-places-she-carries-time",
  title: "Time",
  world: "world/the-places-she-carries",
  description:
    "The day and hour it is, counted as Wren counts her days in the basin: Day 1 is the day she walks down the Warden's Stair.",
} as const satisfies WorldMechanic
