import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lowGradeSynthesis = {
  id: "01a0657d-0241-7835-a1d8-adfc828e73b6",
  type: "page-type/world-skill",
  slug: "low-grade-synthesis",
  title: "Low-Grade Synthesis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
