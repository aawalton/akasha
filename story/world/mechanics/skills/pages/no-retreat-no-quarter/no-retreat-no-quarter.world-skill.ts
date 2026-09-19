import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const noRetreatNoQuarter = {
  id: "01a0657d-027b-7264-bd7b-cd73fda18034",
  type: "page-type/world-skill",
  slug: "no-retreat-no-quarter",
  title: "No Retreat, No Quarter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
