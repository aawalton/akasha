import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const riskCalculation = {
  id: "01a0657d-02b6-79f9-ab0c-e3bee5204cbb",
  type: "page-type/world-skill",
  slug: "risk-calculation",
  title: "Risk Calculation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
