import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flyingHooves = {
  id: "01a06575-980f-7ee7-819c-828e9d05e978",
  type: "world-skill",
  slug: "flying-hooves",
  title: "Flying Hooves",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
