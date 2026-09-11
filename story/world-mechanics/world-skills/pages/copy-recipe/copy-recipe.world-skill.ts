import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const copyRecipe = {
  id: "01a06575-97fd-7384-bc9e-9d7893d60096",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "copy-recipe",
  title: "Copy Recipe",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
