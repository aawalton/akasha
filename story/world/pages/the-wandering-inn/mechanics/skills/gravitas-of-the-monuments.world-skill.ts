import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gravitasOfTheMonuments = {
  id: "01a06575-9816-7ac9-9d55-4a796fcadaff",
  type: "page-type/world-skill",
  slug: "gravitas-of-the-monuments",
  title: "Gravitas of the Monuments",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
