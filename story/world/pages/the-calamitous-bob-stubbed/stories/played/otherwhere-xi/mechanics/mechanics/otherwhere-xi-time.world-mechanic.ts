import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiTime = {
  id: "01a0ea6b-815f-7df8-831c-ed145a6a5b0e",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-time",
  title: "Time",
  world: "world/the-calamitous-bob-stubbed",
  description: "The day and hour it is.",
} as const satisfies WorldMechanic
