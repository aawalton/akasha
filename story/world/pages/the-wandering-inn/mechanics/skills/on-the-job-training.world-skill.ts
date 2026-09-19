import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const onTheJobTraining = {
  id: "01a0657d-027c-7d6d-9671-6141d318513a",
  type: "page-type/world-skill",
  slug: "on-the-job-training",
  title: "On The Job Training",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
