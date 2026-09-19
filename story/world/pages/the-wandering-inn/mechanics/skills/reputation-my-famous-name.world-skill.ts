import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reputationMyFamousName = {
  id: "01a0657d-02b1-70ff-9145-cf7dd9ac1c7e",
  type: "page-type/world-skill",
  slug: "reputation-my-famous-name",
  title: "Reputation: My Famous Name",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
