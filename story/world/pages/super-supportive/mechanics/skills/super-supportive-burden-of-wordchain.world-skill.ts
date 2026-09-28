import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveBurdenOfWordchain = {
  id: "01a0e9f1-d241-7ee7-a841-0605639d0f62",
  type: "page-type/world-skill",
  slug: "super-supportive-burden-of-wordchain",
  title: "Burden of Wordchain",
  world: "world/super-supportive",
  description: "A facet for taking on other people's wordchain debt.",
} as const satisfies WorldSkill
