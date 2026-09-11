import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const dataDiscrepancy = {
  id: "01a06575-9801-7cce-855f-d5654f5cb9da",
  type: "world-skill",
  slug: "data-discrepancy",
  title: "Data Discrepancy",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
