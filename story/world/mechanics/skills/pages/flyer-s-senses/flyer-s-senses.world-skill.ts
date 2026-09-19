import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flyerSSenses = {
  id: "01a06575-980f-740a-8f00-bc4d08b5de41",
  type: "page-type/world-skill",
  slug: "flyer-s-senses",
  title: "Flyer’s Senses",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
