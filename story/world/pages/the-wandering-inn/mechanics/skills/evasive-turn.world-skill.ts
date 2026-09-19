import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evasiveTurn = {
  id: "01a06575-9809-7670-96c0-73a1e0ebb422",
  type: "page-type/world-skill",
  slug: "evasive-turn",
  title: "Evasive Turn",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
