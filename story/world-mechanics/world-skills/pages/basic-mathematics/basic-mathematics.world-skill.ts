import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicMathematics = {
  id: "01a06575-97f3-71fd-bde4-0c38c31c4cbe",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "basic-mathematics",
  title: "Basic Mathematics",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
