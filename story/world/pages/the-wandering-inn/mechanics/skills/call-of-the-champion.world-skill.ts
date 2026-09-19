import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const callOfTheChampion = {
  id: "01a06575-97f9-7efa-99b5-4da6d6e597a9",
  type: "page-type/world-skill",
  slug: "call-of-the-champion",
  title: "Call of the Champion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
