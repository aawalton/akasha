import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theInnkeeperSBounty = {
  id: "01a0657d-0312-78e6-a96f-688b52d3dc77",
  type: "page-type/world-skill",
  slug: "the-innkeeper-s-bounty",
  title: "The Innkeeper’s Bounty",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
