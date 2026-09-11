import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const grandTheater = {
  id: "01a06575-9816-76a0-85e7-3a9e7dac6451",
  type: "world-skill",
  slug: "grand-theater",
  title: "Grand Theater",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
