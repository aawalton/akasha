import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aeriformFist = {
  id: "01a06575-97ea-7364-b9e5-d5dd9df0a44f",
  type: "page-type/world-skill",
  slug: "aeriform-fist",
  title: "Aeriform Fist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
