import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const ingredientsSense = {
  id: "01a06575-981e-73fd-b61e-6fad90851e60",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "ingredients-sense",
  title: "Ingredients Sense",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
