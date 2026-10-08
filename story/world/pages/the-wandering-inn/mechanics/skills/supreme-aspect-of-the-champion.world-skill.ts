import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const supremeAspectOfTheChampion = {
  id: "01a0657d-0303-7b61-9aa6-96e8565a8f24",
  type: "page-type/world-skill",
  slug: "supreme-aspect-of-the-champion",
  title: "Supreme Aspect of the Champion",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-skill/aspect-of-the-champion"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.723Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
