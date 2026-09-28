import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIvTime = {
  id: "01a0e9ea-7b35-7a36-9694-78461cea1d3f",
  type: "page-type/world-mechanic",
  slug: "otherwhere-iv-time",
  title: "Time",
  world: "world/beware-of-chicken",
  description:
    "The day and hour it is where Nala is, counted in days from the morning she came to.",
} as const satisfies WorldMechanic
