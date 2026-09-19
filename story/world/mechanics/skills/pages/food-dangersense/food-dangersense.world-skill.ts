import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const foodDangersense = {
  id: "01a06575-980f-726a-a7d7-7f6a60c676c4",
  type: "page-type/world-skill",
  slug: "food-dangersense",
  title: "Food Dangersense",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
