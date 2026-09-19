import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const whirlwindOfBlows = {
  id: "01a0657d-032e-7d48-a70b-66ca03a0c65f",
  type: "page-type/world-skill",
  slug: "whirlwind-of-blows",
  title: "Whirlwind of Blows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
