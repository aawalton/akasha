import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const appraiseWealth = {
  id: "01a06575-97ec-770a-93a5-475c675a00f1",
  type: "page-type/world-skill",
  slug: "appraise-wealth",
  title: "Appraise Wealth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
