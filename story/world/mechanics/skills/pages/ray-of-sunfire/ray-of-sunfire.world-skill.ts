import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rayOfSunfire = {
  id: "01a0657d-02a4-7b66-a9ec-8601e7c07784",
  type: "page-type/world-skill",
  slug: "ray-of-sunfire",
  title: "Ray of Sunfire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
