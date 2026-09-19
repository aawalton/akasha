import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wildOvergrowth = {
  id: "01a0657d-032e-72ef-922c-15e93c111a0a",
  type: "page-type/world-skill",
  slug: "wild-overgrowth",
  title: "Wild Overgrowth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
