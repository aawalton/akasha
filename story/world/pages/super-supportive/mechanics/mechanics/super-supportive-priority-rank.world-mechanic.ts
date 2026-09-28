import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportivePriorityRank = {
  id: "01a0e9f7-dffa-7ec5-b663-09b05e474f87",
  type: "page-type/world-mechanic",
  slug: "super-supportive-priority-rank",
  title: "Priority Rank",
  world: "world/super-supportive",
  description: "A huge, constantly shifting number in a summoner-facing profile.",
} as const satisfies WorldMechanic
