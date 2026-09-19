import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const corpseRememberedActivity = {
  id: "01a06575-97fe-72fe-9d10-49f4c59c3764",
  type: "page-type/world-skill",
  slug: "corpse-remembered-activity",
  title: "Corpse: Remembered Activity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
