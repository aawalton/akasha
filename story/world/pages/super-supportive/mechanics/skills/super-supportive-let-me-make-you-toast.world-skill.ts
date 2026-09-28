import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveLetMeMakeYouToast = {
  id: "01a0e9f1-d242-7c63-adf1-ec373a07b91c",
  type: "page-type/world-skill",
  slug: "super-supportive-let-me-make-you-toast",
  title: "Let Me Make You Toast",
  world: "world/super-supportive",
  description: 'An F-rank Rabbit skill: "The Rabbit makes near-perfect toast every time."',
} as const satisfies WorldSkill
