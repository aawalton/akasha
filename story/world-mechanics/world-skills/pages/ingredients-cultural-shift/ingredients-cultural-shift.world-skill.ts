import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const ingredientsCulturalShift = {
  id: "01a06575-981e-7d62-8bbd-a51f6b58d51b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "ingredients-cultural-shift",
  title: "Ingredients: Cultural Shift",
  world: "the-wandering-inn",
  aliases: ["Ingredients: Cultural Shift!"],
  references: "jsonl",
} as const satisfies WorldSkill
