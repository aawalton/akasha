import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfMidnight = {
  id: "01a06575-97ef-7008-b98e-d88f6507e4a2",
  type: "page-type/world-skill",
  slug: "aura-of-midnight",
  title: "Aura of Midnight",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-skill/dark-aura"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.559Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
