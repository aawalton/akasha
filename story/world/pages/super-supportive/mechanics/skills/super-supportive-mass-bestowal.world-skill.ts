import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveMassBestowal = {
  id: "01a0e9f1-d242-77e9-aadf-d2f14f5d164f",
  type: "page-type/world-skill",
  slug: "super-supportive-mass-bestowal",
  title: "Mass Bestowal",
  world: "world/super-supportive",
  description: "An S-rank Chainer skill that loads many beneficial chains to buff a group.",
} as const satisfies WorldSkill
