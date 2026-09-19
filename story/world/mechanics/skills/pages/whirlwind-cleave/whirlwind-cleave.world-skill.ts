import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const whirlwindCleave = {
  id: "01a0657d-032e-7220-96d8-ce5812d58e88",
  type: "page-type/world-skill",
  slug: "whirlwind-cleave",
  title: "Whirlwind Cleave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
