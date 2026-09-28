import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereKnowledgePoints = {
  id: "01a0e9a6-b35e-7217-bb85-d90dcb419513",
  type: "page-type/world-mechanic",
  slug: "otherwhere-knowledge-points",
  title: "Knowledge Points",
  world: "world/labyrinth-of-the-mad-god",
  description: "Tutorial points spent at a kiosk to open the System's encyclopedia.",
} as const satisfies WorldMechanic
