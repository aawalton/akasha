import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const casualtyReport = {
  id: "01a06575-97fa-7192-9fef-290f75de34f3",
  type: "world-skill",
  slug: "casualty-report",
  title: "Casualty Report",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
