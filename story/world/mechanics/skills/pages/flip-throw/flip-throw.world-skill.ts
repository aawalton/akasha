import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flipThrow = {
  id: "01a06575-980e-7cd4-b254-1b3a3234498a",
  type: "page-type/world-skill",
  slug: "flip-throw",
  title: "Flip Throw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
