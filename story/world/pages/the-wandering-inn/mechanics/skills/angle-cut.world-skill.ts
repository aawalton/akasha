import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const angleCut = {
  id: "01a06575-97eb-7cf2-8efc-0d7fe2f73778",
  type: "page-type/world-skill",
  slug: "angle-cut",
  title: "Angle Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
