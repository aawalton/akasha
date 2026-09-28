import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveFlickerer = {
  id: "01a0e9f1-d241-76cc-89bd-efc82f2c4ef8",
  type: "page-type/world-skill",
  slug: "super-supportive-flickerer",
  title: "Flickerer",
  world: "world/super-supportive",
  description: "An F-rank single-level skill that temporarily interrupts minor enchantments.",
} as const satisfies WorldSkill
