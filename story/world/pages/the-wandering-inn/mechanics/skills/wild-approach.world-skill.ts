import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wildApproach = {
  id: "01a0657d-032e-7436-b830-e9806b4774ad",
  type: "page-type/world-skill",
  slug: "wild-approach",
  title: "Wild Approach",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
