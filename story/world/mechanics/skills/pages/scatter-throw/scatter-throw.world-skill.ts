import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const scatterThrow = {
  id: "01a0657d-02b8-7d2d-bdba-3d2f80958852",
  type: "page-type/world-skill",
  slug: "scatter-throw",
  title: "Scatter Throw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
