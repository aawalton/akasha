import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const alterEgo = {
  id: "01a06575-97eb-7875-9929-602fa1d52c74",
  type: "page-type/world-skill",
  slug: "alter-ego",
  title: "Alter Ego",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
