import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveThroughblow = {
  id: "01a0e9f1-d242-7e76-abfc-df746c101102",
  type: "page-type/world-skill",
  slug: "super-supportive-throughblow",
  title: "Throughblow",
  world: "world/super-supportive",
  description: "A Meister skill that lands a strike's force on the far side of what is hit.",
} as const satisfies WorldSkill
