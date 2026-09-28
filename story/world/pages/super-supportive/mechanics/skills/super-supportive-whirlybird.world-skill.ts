import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveWhirlybird = {
  id: "01a0e9fb-2b67-73c5-bee6-87edcc4ebb20",
  type: "page-type/world-skill",
  slug: "super-supportive-whirlybird",
  title: "Whirlybird",
  world: "world/super-supportive",
  description: "A skill that twirls its user up into the air and back down.",
} as const satisfies WorldSkill
