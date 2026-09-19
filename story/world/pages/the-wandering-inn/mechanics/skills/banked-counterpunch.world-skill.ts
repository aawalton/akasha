import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bankedCounterpunch = {
  id: "01a06575-97f2-7208-8ec4-1804f047a44f",
  type: "page-type/world-skill",
  slug: "banked-counterpunch",
  title: "Banked Counterpunch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
