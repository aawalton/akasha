import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const convertObjectFood = {
  id: "01a06575-97fd-78d3-83ba-b755d928a08c",
  type: "page-type/world-skill",
  slug: "convert-object-food",
  title: "Convert Object: Food",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
