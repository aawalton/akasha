import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mightMakesRight = {
  id: "01a0657d-024d-7240-8ccb-756ac3869b23",
  type: "page-type/world-skill",
  slug: "might-makes-right",
  title: "Might Makes Right",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
