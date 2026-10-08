import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aspectOfTheChampion = {
  id: "01a06575-97ee-7cf2-a464-b45d6a5cbe6f",
  type: "page-type/world-skill",
  slug: "aspect-of-the-champion",
  title: "Aspect of the Champion",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesToSlugs: ["world-skill/supreme-aspect-of-the-champion"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.558Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
