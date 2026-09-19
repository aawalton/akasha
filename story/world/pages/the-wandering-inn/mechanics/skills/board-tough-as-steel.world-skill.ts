import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boardToughAsSteel = {
  id: "01a06575-97f6-791b-83b6-51cef8e3936f",
  type: "page-type/world-skill",
  slug: "board-tough-as-steel",
  title: "Board: Tough as Steel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
