import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveLocateResources = {
  id: "01a0e9f1-d242-7cf9-9820-0a457c487bbd",
  type: "page-type/world-skill",
  slug: "super-supportive-locate-resources",
  title: "Locate Resources",
  world: "world/super-supportive",
  description: 'An S-rank Rabbit skill that gives a string of magically generated "Aha!" moments.',
} as const satisfies WorldSkill
