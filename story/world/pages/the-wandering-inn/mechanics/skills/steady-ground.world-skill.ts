import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const steadyGround = {
  id: "01a0657d-02ef-791f-b423-3074504cce9d",
  type: "page-type/world-skill",
  slug: "steady-ground",
  title: "Steady Ground",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
