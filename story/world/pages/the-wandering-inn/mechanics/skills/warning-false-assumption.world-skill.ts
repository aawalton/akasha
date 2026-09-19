import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const warningFalseAssumption = {
  id: "01a0657d-032c-76df-9bb3-270b0c4fec5b",
  type: "page-type/world-skill",
  slug: "warning-false-assumption",
  title: "Warning: False Assumption",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
