import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armform = {
  id: "01a06575-97ec-7ae1-8c71-8f2820b85a99",
  type: "page-type/world-skill",
  slug: "armform",
  title: "Armform",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
