import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const casualtyReport = {
  id: "01a06575-97fa-7192-9fef-290f75de34f3",
  type: "page-type/world-skill",
  slug: "casualty-report",
  title: "Casualty Report",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
