import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveRareClass = {
  id: "01a0e9f0-3dfb-79c9-9668-ed20d10d2b46",
  type: "page-type/world-mechanic",
  slug: "super-supportive-rare-class",
  title: "Rares",
  world: "world/super-supportive",
  aliases: ["rare", "ultra rare"],
  description: "The name for any class assigned to less than one percent of the selection pool.",
  createdAt: "2026-09-28T21:33:50.971Z",
  updatedAt: "2026-09-28T21:33:54.000Z",
} as const satisfies WorldMechanic
