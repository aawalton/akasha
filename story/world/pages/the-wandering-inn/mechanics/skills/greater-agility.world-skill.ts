import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterAgility = {
  id: "01a06575-9816-737b-9058-9dc7449c3fa4",
  type: "page-type/world-skill",
  slug: "greater-agility",
  title: "Greater Agility",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
