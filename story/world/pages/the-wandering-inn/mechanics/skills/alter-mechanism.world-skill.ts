import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const alterMechanism = {
  id: "01a06575-97eb-7e44-be29-165f5d759274",
  type: "page-type/world-skill",
  slug: "alter-mechanism",
  title: "Alter Mechanism",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
