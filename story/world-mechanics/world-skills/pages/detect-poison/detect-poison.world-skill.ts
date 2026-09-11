import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const detectPoison = {
  id: "01a06575-9803-7ca9-ac98-a6a3b6d29b50",
  type: "world-skill",
  slug: "detect-poison",
  title: "Detect Poison",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
