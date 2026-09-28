import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveEmergencySummons = {
  id: "01a0e9f1-cfc2-7808-9ffd-8f27dfad9c03",
  type: "page-type/world-mechanic",
  slug: "super-supportive-emergency-summons",
  title: "Emergency summons",
  world: "world/super-supportive",
  aliases: ["emergency teleport"],
  description: "A summons that takes an Avowed instantly.",
} as const satisfies WorldMechanic
