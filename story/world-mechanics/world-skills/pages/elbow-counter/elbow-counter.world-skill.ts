import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const elbowCounter = {
  id: "01a06575-9807-73b6-8834-84321de0f021",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "elbow-counter",
  title: "Elbow Counter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
