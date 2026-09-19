import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fullPowerBlow = {
  id: "01a06575-9811-71b7-8ed9-660b38db471a",
  type: "page-type/world-skill",
  slug: "full-power-blow",
  title: "Full Power Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
