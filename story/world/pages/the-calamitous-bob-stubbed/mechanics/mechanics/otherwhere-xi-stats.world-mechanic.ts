import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiStats = {
  id: "01a0ea76-90e7-7eaf-b85d-3478b01aa516",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-stats",
  title: "Stats",
  world: "world/the-calamitous-bob-stubbed",
  description: "Six numbers that measure a person's body and mind.",
} as const satisfies WorldMechanic
