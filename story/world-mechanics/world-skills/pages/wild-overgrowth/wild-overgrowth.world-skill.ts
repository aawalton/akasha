import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const wildOvergrowth = {
  id: "01a0657d-032e-72ef-922c-15e93c111a0a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "wild-overgrowth",
  title: "Wild Overgrowth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
