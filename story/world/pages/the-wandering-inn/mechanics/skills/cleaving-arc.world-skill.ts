import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cleavingArc = {
  id: "01a06575-97fb-7db3-94f0-3894f44600f8",
  type: "page-type/world-skill",
  slug: "cleaving-arc",
  title: "Cleaving Arc",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
