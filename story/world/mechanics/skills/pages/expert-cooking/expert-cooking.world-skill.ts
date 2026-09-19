import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const expertCooking = {
  id: "01a06575-980a-73a5-8b9b-ea1d50dcc80e",
  type: "page-type/world-skill",
  slug: "expert-cooking",
  title: "Expert Cooking",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
