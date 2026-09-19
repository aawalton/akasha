import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickArrows = {
  id: "01a0657d-029b-71c3-b33e-c04ff9a4c6d3",
  type: "page-type/world-skill",
  slug: "quick-arrows",
  title: "Quick Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
