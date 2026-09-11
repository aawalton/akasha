import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const deepBucket = {
  id: "01a06575-9802-7277-ba6c-7d8ea7fa8071",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "deep-bucket",
  title: "Deep Bucket",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
