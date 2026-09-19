import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aspectsOfTheInn = {
  id: "01a06575-97ee-79d9-b590-4ef3b2cf99b8",
  type: "page-type/world-skill",
  slug: "aspects-of-the-inn",
  title: "Aspects of the Inn",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
