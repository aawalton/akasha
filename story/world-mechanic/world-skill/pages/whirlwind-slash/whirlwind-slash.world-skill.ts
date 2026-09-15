import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const whirlwindSlash = {
  id: "01a0657d-032e-7377-a0f7-9c40bf61b472",
  type: "world-skill",
  slug: "whirlwind-slash",
  title: "Whirlwind Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
