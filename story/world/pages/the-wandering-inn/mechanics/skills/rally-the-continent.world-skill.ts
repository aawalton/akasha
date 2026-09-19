import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rallyTheContinent = {
  id: "01a0657d-029c-71aa-83c5-966b7bebcbe0",
  type: "page-type/world-skill",
  slug: "rally-the-continent",
  title: "Rally the Continent",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
