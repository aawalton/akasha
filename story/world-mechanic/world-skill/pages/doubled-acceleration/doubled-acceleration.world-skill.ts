import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const doubledAcceleration = {
  id: "01a06575-9805-7b63-861b-11f7cf37ecc9",
  type: "world-skill",
  slug: "doubled-acceleration",
  title: "Doubled Acceleration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
