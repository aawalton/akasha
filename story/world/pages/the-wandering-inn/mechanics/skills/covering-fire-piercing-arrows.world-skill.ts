import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const coveringFirePiercingArrows = {
  id: "01a06575-97fe-7bc4-9776-d96f85ac2e25",
  type: "page-type/world-skill",
  slug: "covering-fire-piercing-arrows",
  title: "Covering Fire (Piercing Arrows)",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-skill/covering-fire"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.574Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
