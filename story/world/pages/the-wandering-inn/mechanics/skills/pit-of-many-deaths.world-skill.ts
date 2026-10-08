import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pitOfManyDeaths = {
  id: "01a0657d-0295-791a-abd7-2719fcf632f3",
  type: "page-type/world-skill",
  slug: "pit-of-many-deaths",
  title: "Pit of Many Deaths",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-skill/pitfall-trap"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.613Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
