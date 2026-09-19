import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const timeOfTheArcher = {
  id: "01a0657d-0315-78b4-a954-0d0ec204de40",
  type: "page-type/world-skill",
  slug: "time-of-the-archer",
  title: "Time of the Archer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
