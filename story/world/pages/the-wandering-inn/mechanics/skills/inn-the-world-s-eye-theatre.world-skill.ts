import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innTheWorldSEyeTheatre = {
  id: "01a06575-981f-72d8-a787-a5d3571b9ee0",
  type: "page-type/world-skill",
  slug: "inn-the-world-s-eye-theatre",
  title: "Inn: The World’s Eye Theatre",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-skill/inn-grand-theatre"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.607Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
