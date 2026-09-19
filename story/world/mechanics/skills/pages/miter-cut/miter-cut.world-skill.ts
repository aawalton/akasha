import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const miterCut = {
  id: "01a0657d-026f-78af-9b48-f077cd44cdeb",
  type: "page-type/world-skill",
  slug: "miter-cut",
  title: "Miter Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
