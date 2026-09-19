import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theKingSArchitect = {
  id: "01a0657d-0312-7f41-811a-33adb898541a",
  type: "page-type/world-skill",
  slug: "the-king-s-architect",
  title: "The King’s Architect",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
