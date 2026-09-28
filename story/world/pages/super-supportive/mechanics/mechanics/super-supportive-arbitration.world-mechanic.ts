import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveArbitration = {
  id: "01a0e9f1-cfc1-71e7-b2f6-bbb161c57095",
  type: "page-type/world-mechanic",
  slug: "super-supportive-arbitration",
  title: "Arbitration",
  world: "world/super-supportive",
  aliases: ["arbitrator"],
  description: "A review of a dispute between an Avowed and a summoner, made by an arbitrator.",
} as const satisfies WorldMechanic
