import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const castOfTheFisherman = {
  id: "01a06575-97fa-70d1-aa4c-5adeb63e12a2",
  type: "world-skill",
  slug: "cast-of-the-fisherman",
  title: "Cast of the Fisherman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
