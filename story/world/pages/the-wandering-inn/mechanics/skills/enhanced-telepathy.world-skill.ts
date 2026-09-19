import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedTelepathy = {
  id: "01a06575-9809-724a-910d-0f8e4f7e205c",
  type: "page-type/world-skill",
  slug: "enhanced-telepathy",
  title: "Enhanced Telepathy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
