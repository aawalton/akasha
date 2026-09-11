import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const metabolicBoost = {
  id: "01a0657d-024c-7435-bbe1-768b7b3b603b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "metabolic-boost",
  title: "Metabolic Boost",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
