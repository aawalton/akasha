import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const compartmentalizedKnowledge = {
  id: "01a06575-97fc-7524-a42b-613d1a72ce7c",
  type: "page-type/world-skill",
  slug: "compartmentalized-knowledge",
  title: "Compartmentalized Knowledge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
