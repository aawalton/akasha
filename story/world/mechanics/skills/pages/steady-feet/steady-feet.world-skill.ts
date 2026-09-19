import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const steadyFeet = {
  id: "01a0657d-02ef-7a33-9b88-c03b741dc5cb",
  type: "page-type/world-skill",
  slug: "steady-feet",
  title: "Steady Feet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
