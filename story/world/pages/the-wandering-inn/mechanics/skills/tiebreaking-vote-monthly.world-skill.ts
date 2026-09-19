import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tiebreakingVoteMonthly = {
  id: "01a0657d-0315-7333-a4b6-d127cc037caa",
  type: "page-type/world-skill",
  slug: "tiebreaking-vote-monthly",
  title: "Tiebreaking Vote (Monthly)",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
