import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const collectFee = {
  id: "01a06575-97fb-72d2-ae50-ac71d6eaec57",
  type: "page-type/world-skill",
  slug: "collect-fee",
  title: "Collect Fee",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
