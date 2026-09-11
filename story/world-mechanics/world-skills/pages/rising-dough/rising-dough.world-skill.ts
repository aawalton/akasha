import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const risingDough = {
  id: "01a0657d-02b2-70f1-8275-54c33fc8e818",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "rising-dough",
  title: "Rising Dough",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
