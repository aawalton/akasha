import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const totalImmersionLiterature = {
  id: "01a0657d-0315-77c6-9175-6e4f7bc50e2b",
  type: "page-type/world-skill",
  slug: "total-immersion-literature",
  title: "Total Immersion: Literature",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
