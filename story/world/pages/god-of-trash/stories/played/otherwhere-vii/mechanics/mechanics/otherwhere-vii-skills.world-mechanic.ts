import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereViiSkills = {
  id: "01a0ea36-990a-7921-96ea-121fbf773453",
  type: "page-type/world-mechanic",
  slug: "otherwhere-vii-skills",
  title: "Skills",
  world: "world/god-of-trash",
  description: "The abilities the System counts by level, from sewing to resisting pain.",
} as const satisfies WorldMechanic
