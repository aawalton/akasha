import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiSkills = {
  id: "01a0ea77-acdc-724f-b0d4-5828b73f7f15",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-skills",
  title: "Skills",
  world: "world/the-calamitous-bob-stubbed",
  description: "An ability the interface names and ranks for the one who holds it.",
} as const satisfies WorldMechanic
