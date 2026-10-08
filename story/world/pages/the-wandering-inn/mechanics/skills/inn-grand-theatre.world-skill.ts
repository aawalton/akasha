import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innGrandTheatre = {
  id: "01a06575-981f-7e56-92e5-5ac6ba6d7b2e",
  type: "page-type/world-skill",
  slug: "inn-grand-theatre",
  title: "Inn: Grand Theatre",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-skill/inn-the-world-s-eye-theatre"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.607Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
