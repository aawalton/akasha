import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const immunityAlcohol = {
  id: "01a06575-981d-70ce-ba6c-af84b7dcc006",
  type: "page-type/world-skill",
  slug: "immunity-alcohol",
  title: "Immunity: Alcohol",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
