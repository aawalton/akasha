import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiDeadlands = {
  id: "01a0ea85-ad41-7f61-b9ad-5f81ec77c48d",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-deadlands",
  title: "Deadlands",
  world: "world/the-calamitous-bob-stubbed",
  description: "Gray, sunless country where nothing grows and the dead walk.",
} as const satisfies WorldMechanic
