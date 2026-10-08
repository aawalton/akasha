import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const collectFee = {
  id: "01a06575-97fb-72d2-ae50-ac71d6eaec57",
  type: "page-type/world-skill",
  slug: "collect-fee",
  title: "Collect Fee",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.571Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
