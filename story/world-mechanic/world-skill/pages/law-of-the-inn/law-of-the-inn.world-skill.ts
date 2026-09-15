import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const lawOfTheInn = {
  id: "01a06575-9822-71b9-9c4e-28700f469f0a",
  type: "world-skill",
  slug: "law-of-the-inn",
  title: "Law of the Inn",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
