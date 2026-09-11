import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const createLifesandGolems = {
  id: "01a06575-97fe-77a5-a842-9c2a9c5ac63e",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "create-lifesand-golems",
  title: "Create Lifesand Golems",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
