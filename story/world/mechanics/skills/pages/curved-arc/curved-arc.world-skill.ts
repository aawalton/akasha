import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const curvedArc = {
  id: "01a06575-97ff-730d-a547-54e667becdec",
  type: "page-type/world-skill",
  slug: "curved-arc",
  title: "Curved Arc",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
