import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evasiveScamper = {
  id: "01a06575-9809-7d86-a76b-62743c335ea5",
  type: "page-type/world-skill",
  slug: "evasive-scamper",
  title: "Evasive Scamper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
