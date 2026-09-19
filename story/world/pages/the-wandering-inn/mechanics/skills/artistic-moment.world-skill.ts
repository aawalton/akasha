import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const artisticMoment = {
  id: "01a06575-97ed-71e0-97c2-2e4deee6f1fb",
  type: "page-type/world-skill",
  slug: "artistic-moment",
  title: "Artistic Moment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
