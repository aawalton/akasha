import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wildGrowth = {
  id: "01a0657d-032e-7d2a-8c4f-81dc2a6610d3",
  type: "page-type/world-skill",
  slug: "wild-growth",
  title: "Wild Growth",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
