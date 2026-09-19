import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evasiveManeuver = {
  id: "01a06575-9809-7c6f-b115-6632fe19adac",
  type: "page-type/world-skill",
  slug: "evasive-maneuver",
  title: "Evasive Maneuver",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
