import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const clearStatement = {
  id: "01a06575-97fb-78f1-a953-204568805c25",
  type: "page-type/world-skill",
  slug: "clear-statement",
  title: "Clear Statement",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
