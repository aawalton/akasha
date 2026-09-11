import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const createLifeglass = {
  id: "01a06575-97fe-7e4c-a0f1-ae9ca0ba91bb",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "create-lifeglass",
  title: "Create Lifeglass",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
