import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enrichedRecipes = {
  id: "01a06575-9809-7008-af51-6ef24c3ca278",
  type: "page-type/world-skill",
  slug: "enriched-recipes",
  title: "Enriched Recipes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
