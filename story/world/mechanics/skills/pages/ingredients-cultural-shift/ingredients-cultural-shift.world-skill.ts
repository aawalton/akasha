import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ingredientsCulturalShift = {
  id: "01a06575-981e-7d62-8bbd-a51f6b58d51b",
  type: "page-type/world-skill",
  slug: "ingredients-cultural-shift",
  title: "Ingredients: Cultural Shift",
  world: "world/the-wandering-inn",
  aliases: ["Ingredients: Cultural Shift!"],
  references: "jsonl",
} as const satisfies WorldSkill
