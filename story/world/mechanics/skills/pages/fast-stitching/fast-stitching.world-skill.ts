import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastStitching = {
  id: "01a06575-980c-706e-9fbe-051222e3c209",
  type: "page-type/world-skill",
  slug: "fast-stitching",
  title: "Fast Stitching",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
