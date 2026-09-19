import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dexterityOfThought = {
  id: "01a06575-9803-760d-978f-f1a66fd648b1",
  type: "page-type/world-skill",
  slug: "dexterity-of-thought",
  title: "Dexterity of Thought",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
