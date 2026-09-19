import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dataDiscrepancy = {
  id: "01a06575-9801-7cce-855f-d5654f5cb9da",
  type: "page-type/world-skill",
  slug: "data-discrepancy",
  title: "Data Discrepancy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
