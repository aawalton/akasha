import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveDriftseed = {
  id: "01a0e9fa-4781-7453-9de0-7399abd50c4d",
  type: "page-type/world-skill",
  slug: "super-supportive-driftseed",
  title: "Driftseed",
  world: "world/super-supportive",
  description:
    "A knight skill that makes things drift and float, applicable to an area or a category.",
} as const satisfies WorldSkill
