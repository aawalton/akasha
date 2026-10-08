import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const appraiseWealth = {
  id: "01a06575-97ec-770a-93a5-475c675a00f1",
  type: "page-type/world-skill",
  slug: "appraise-wealth",
  title: "Appraise Wealth",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.556Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
