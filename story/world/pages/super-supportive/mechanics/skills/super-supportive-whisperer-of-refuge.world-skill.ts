import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveWhispererOfRefuge = {
  id: "01a0e9fa-4782-7a15-9963-aaa4724435a4",
  type: "page-type/world-skill",
  slug: "super-supportive-whisperer-of-refuge",
  title: "Whisperer of Refuge",
  world: "world/super-supportive",
  description: "A knight skill that protects a refuge area only those told of it may enter.",
} as const satisfies WorldSkill
