import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const theInnkeeperSDailySupply = {
  id: "01a0657d-0312-73c8-a1ab-4e45f826df9f",
  type: "world-skill",
  slug: "the-innkeeper-s-daily-supply",
  title: "The Innkeeper’s Daily Supply",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
