import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const safetyDance = {
  id: "01a0657d-02b7-7674-8377-4aaac3ebc8c6",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "safety-dance",
  title: "Safety Dance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
