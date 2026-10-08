import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveEmergencySummons = {
  id: "01a0e9f1-cfc2-7808-9ffd-8f27dfad9c03",
  type: "page-type/world-mechanic",
  slug: "super-supportive-emergency-summons",
  title: "Emergency summons",
  world: "world/super-supportive",
  aliases: ["emergency teleport"],
  description: "A summons that takes an Avowed instantly.",
  createdAt: "2026-09-28T21:35:33.826Z",
  updatedAt: "2026-09-28T21:35:36.000Z",
} as const satisfies WorldMechanic
