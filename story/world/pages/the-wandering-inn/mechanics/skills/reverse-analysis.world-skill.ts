import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reverseAnalysis = {
  id: "01a0657d-02b1-7f9f-8bf6-ea4dc80a9b41",
  type: "page-type/world-skill",
  slug: "reverse-analysis",
  title: "Reverse Analysis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
