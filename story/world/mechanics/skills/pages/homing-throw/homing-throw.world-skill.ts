import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const homingThrow = {
  id: "01a06575-981a-70d6-af40-810ce8c39efb",
  type: "page-type/world-skill",
  slug: "homing-throw",
  title: "Homing Throw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
