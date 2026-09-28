import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveReturningGuardblade = {
  id: "01a0e9fa-4782-7cf0-a8ff-c5931a493d64",
  type: "page-type/world-skill",
  slug: "super-supportive-returning-guardblade",
  title: "Returning Guardblade",
  world: "world/super-supportive",
  description:
    "A knight skill that grows more powerful against whatever stands between its holder and what they protect.",
} as const satisfies WorldSkill
