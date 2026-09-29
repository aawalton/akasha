import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiMilestones = {
  id: "01a0ea76-90e7-7ba2-8257-9b9e66e6beeb",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-milestones",
  title: "Milestones",
  world: "world/the-calamitous-bob-stubbed",
  description: "A leap in what a stat gives, reached at each multiple of ten.",
} as const satisfies WorldMechanic
