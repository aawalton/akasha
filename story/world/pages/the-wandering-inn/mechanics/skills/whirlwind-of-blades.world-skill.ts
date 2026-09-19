import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const whirlwindOfBlades = {
  id: "01a0657d-032e-7757-b2b6-9e3224699422",
  type: "page-type/world-skill",
  slug: "whirlwind-of-blades",
  title: "Whirlwind of Blades",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
