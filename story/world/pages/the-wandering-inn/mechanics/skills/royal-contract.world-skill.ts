import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const royalContract = {
  id: "01a0657d-02b7-77f6-abfe-d21c10f0818f",
  type: "page-type/world-skill",
  slug: "royal-contract",
  title: "Royal Contract",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
