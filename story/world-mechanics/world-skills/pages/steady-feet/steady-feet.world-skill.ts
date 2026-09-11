import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const steadyFeet = {
  id: "01a0657d-02ef-7a33-9b88-c03b741dc5cb",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "steady-feet",
  title: "Steady Feet",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
