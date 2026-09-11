import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const boatSprayCutter = {
  id: "01a06575-97f6-7e01-b72e-f9b5aabb7d0d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "boat-spray-cutter",
  title: "Boat: Spray Cutter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
