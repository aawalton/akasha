import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const greaterPainTolerance = {
  id: "01a06575-9817-74c1-a64d-3b5fd37bf2b0",
  type: "world-skill",
  slug: "greater-pain-tolerance",
  title: "Greater Pain Tolerance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
