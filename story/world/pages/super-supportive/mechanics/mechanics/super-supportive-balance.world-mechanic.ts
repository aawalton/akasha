import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveBalance = {
  id: "01a0e9f7-dffa-7d3a-8a29-e2b211d317d5",
  type: "page-type/world-mechanic",
  slug: "super-supportive-balance",
  title: "Balance",
  world: "world/super-supportive",
  description: "A stat for keeping one's footing.",
} as const satisfies WorldMechanic
