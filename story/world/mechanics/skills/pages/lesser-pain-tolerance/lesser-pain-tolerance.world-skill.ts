import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserPainTolerance = {
  id: "01a06575-9823-7c3d-a05e-fbd5639e7ef5",
  type: "page-type/world-skill",
  slug: "lesser-pain-tolerance",
  title: "Lesser Pain Tolerance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
