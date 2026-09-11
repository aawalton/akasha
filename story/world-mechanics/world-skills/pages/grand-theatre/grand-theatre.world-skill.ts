import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const grandTheatre = {
  id: "01a06575-9816-72d2-99f1-6d626735947f",
  type: "world-skill",
  slug: "grand-theatre",
  title: "Grand Theatre",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
