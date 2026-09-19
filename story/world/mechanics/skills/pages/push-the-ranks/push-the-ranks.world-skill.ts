import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pushTheRanks = {
  id: "01a0657d-029a-7b6f-a12b-15b298c8e4ef",
  type: "page-type/world-skill",
  slug: "push-the-ranks",
  title: "Push the Ranks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
