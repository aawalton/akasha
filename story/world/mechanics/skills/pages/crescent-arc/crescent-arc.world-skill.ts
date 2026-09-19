import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const crescentArc = {
  id: "01a06575-97ff-79c1-baea-b6e1103db618",
  type: "page-type/world-skill",
  slug: "crescent-arc",
  title: "Crescent Arc",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
