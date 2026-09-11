import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const shipRammingHull = {
  id: "01a0657d-02c0-7400-9d5c-6caa6b0fb7da",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "ship-ramming-hull",
  title: "Ship: Ramming Hull",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
