import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const callOfTheChampion = {
  id: "01a06575-97f9-7efa-99b5-4da6d6e597a9",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "call-of-the-champion",
  title: "Call of the Champion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
