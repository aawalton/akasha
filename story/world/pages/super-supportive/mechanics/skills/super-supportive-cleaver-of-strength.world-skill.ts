import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveCleaverOfStrength = {
  id: "01a0e9f6-d517-77b0-bba2-4030f9adeff1",
  type: "page-type/world-skill",
  slug: "super-supportive-cleaver-of-strength",
  title: "Cleaver of Strength",
  world: "world/super-supportive",
  description:
    "A knight skill that strikes the point of greatest strength with the user's own, turning it into a crack.",
} as const satisfies WorldSkill
