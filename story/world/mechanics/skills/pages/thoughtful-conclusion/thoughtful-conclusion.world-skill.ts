import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thoughtfulConclusion = {
  id: "01a0657d-0315-737e-a5b4-49d13f318173",
  type: "page-type/world-skill",
  slug: "thoughtful-conclusion",
  title: "Thoughtful Conclusion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
