import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const artBecomesReality = {
  id: "01a06575-97ed-7618-853f-b39965c1a1e5",
  type: "page-type/world-skill",
  slug: "art-becomes-reality",
  title: "Art Becomes Reality",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
