import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveGuardianOfGates = {
  id: "01a0e9fa-4781-764e-bbc9-9cd05554a23a",
  type: "page-type/world-skill",
  slug: "super-supportive-guardian-of-gates",
  title: "Guardian of Gates",
  world: "world/super-supportive",
  description: "A knight skill.",
} as const satisfies WorldSkill
