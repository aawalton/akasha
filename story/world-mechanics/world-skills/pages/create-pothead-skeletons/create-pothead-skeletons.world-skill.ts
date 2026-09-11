import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const createPotheadSkeletons = {
  id: "01a06575-97ff-78dc-a9ed-49c14b1e1899",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "create-pothead-skeletons",
  title: "Create Pothead Skeletons",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
