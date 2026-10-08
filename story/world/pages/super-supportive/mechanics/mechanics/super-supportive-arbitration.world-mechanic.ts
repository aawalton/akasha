import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveArbitration = {
  id: "01a0e9f1-cfc1-71e7-b2f6-bbb161c57095",
  type: "page-type/world-mechanic",
  slug: "super-supportive-arbitration",
  title: "Arbitration",
  world: "world/super-supportive",
  aliases: ["arbitrator"],
  description: "A review of a dispute between an Avowed and a summoner, made by an arbitrator.",
  createdAt: "2026-09-28T21:35:33.825Z",
  updatedAt: "2026-09-28T21:35:36.000Z",
} as const satisfies WorldMechanic
