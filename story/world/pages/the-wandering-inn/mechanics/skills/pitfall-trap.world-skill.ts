import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pitfallTrap = {
  id: "01a0657d-0295-76d2-909e-34cc6eef1705",
  type: "page-type/world-skill",
  slug: "pitfall-trap",
  title: "Pitfall Trap",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-skill/pit-of-many-deaths"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.613Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
