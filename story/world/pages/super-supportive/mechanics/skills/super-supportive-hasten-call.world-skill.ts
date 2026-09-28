import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveHastenCall = {
  id: "01a0e9fb-2b67-7eab-8901-d761429606f1",
  type: "page-type/world-skill",
  slug: "super-supportive-hasten-call",
  title: "Hasten Call",
  world: "world/super-supportive",
  description: "A Shaper skill that moves the element faster than normal limits.",
} as const satisfies WorldSkill
