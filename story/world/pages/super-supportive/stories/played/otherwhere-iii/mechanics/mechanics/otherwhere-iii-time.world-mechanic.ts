import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIiiTime = {
  id: "01a0e9e1-aa60-79c6-9172-33179a07b82d",
  type: "page-type/world-mechanic",
  slug: "otherwhere-iii-time",
  title: "Time",
  world: "world/super-supportive",
  description:
    "The date and hour it is where Nala is, counted in days from the morning she came to.",
} as const satisfies WorldMechanic
