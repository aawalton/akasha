import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const wildGrowth = {
  id: "01a0657d-032e-7d2a-8c4f-81dc2a6610d3",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "wild-growth",
  title: "Wild Growth",
  world: "the-wandering-inn",
} as const satisfies WorldSkill
