import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const theInnkeeperSDailyBounty = {
  id: "01a0657d-0312-7cc8-a8dc-014c980d2ce5",
  type: "world-skill",
  slug: "the-innkeeper-s-daily-bounty",
  title: "The Innkeeper’s Daily Bounty",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
