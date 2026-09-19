import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evasiveLeap = {
  id: "01a06575-9809-7201-9bef-2e2674dd3cc9",
  type: "page-type/world-skill",
  slug: "evasive-leap",
  title: "Evasive Leap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
