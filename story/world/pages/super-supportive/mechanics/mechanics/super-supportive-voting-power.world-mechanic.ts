import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveVotingPower = {
  id: "01a0e9fa-4781-7f05-b257-1c05dc37ada1",
  type: "page-type/world-mechanic",
  slug: "super-supportive-voting-power",
  title: "Voting power",
  world: "world/super-supportive",
  aliases: ["loyalty marks"],
  description:
    "The political weight a wizard gathers from the loyalty of ordinary-class people and other wizards.",
  createdAt: "2026-09-28T21:44:48.769Z",
  updatedAt: "2026-09-28T21:44:54.000Z",
} as const satisfies WorldMechanic
