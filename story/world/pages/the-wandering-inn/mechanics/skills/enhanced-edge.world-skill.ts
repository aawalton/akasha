import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedEdge = {
  id: "01a06575-9808-7faa-9807-e5f600e14200",
  type: "page-type/world-skill",
  slug: "enhanced-edge",
  title: "Enhanced Edge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
