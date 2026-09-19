import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickSketch = {
  id: "01a0657d-029b-72f9-ae24-985b80a6bb07",
  type: "page-type/world-skill",
  slug: "quick-sketch",
  title: "Quick Sketch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
