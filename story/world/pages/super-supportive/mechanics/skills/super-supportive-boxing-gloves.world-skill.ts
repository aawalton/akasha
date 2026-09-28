import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveBoxingGloves = {
  id: "01a0e9f6-d516-77c4-bb0a-04c8c9041cf0",
  type: "page-type/world-skill",
  slug: "super-supportive-boxing-gloves",
  title: "Boxing Gloves",
  world: "world/super-supportive",
  description: "A Brute skill.",
} as const satisfies WorldSkill
