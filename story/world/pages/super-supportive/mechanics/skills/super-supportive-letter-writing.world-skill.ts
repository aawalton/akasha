import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveLetterWriting = {
  id: "01a0e9f1-d242-7d0f-b361-b5c397a041a4",
  type: "page-type/world-skill",
  slug: "super-supportive-letter-writing",
  title: "Letter Writing",
  world: "world/super-supportive",
  description: 'A D-rank Rabbit skill: "The Rabbit has near-perfect penmanship."',
} as const satisfies WorldSkill
