import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mutualBet = {
  id: "01a0657d-0270-7bf2-a4ff-cd0ba07bc1ee",
  type: "page-type/world-skill",
  slug: "mutual-bet",
  title: "Mutual Bet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
