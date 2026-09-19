import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const whirlwindSlice = {
  id: "01a0657d-032e-7b9a-8a1b-24fa90457917",
  type: "page-type/world-skill",
  slug: "whirlwind-slice",
  title: "Whirlwind Slice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
