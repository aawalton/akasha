import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const whirlwindDodge = {
  id: "01a0657d-032e-7b61-ba47-816e90e2b960",
  type: "page-type/world-skill",
  slug: "whirlwind-dodge",
  title: "Whirlwind Dodge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
