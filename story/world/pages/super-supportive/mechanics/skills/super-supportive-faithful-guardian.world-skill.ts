import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveFaithfulGuardian = {
  id: "01a0e9fa-4781-77e6-90a3-e4ca27fc89e1",
  type: "page-type/world-skill",
  slug: "super-supportive-faithful-guardian",
  title: "Faithful Guardian",
  world: "world/super-supportive",
  description: "An older knight skill.",
} as const satisfies WorldSkill
