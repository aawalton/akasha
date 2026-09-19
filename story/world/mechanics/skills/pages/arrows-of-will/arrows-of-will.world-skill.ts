import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arrowsOfWill = {
  id: "01a06575-97ed-73b4-91ca-d135ec027d77",
  type: "page-type/world-skill",
  slug: "arrows-of-will",
  title: "Arrows of Will",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
