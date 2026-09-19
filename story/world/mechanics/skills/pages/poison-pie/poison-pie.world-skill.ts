import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const poisonPie = {
  id: "01a0657d-0295-74fc-b2e2-79e06a7038cd",
  type: "page-type/world-skill",
  slug: "poison-pie",
  title: "Poison Pie",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
