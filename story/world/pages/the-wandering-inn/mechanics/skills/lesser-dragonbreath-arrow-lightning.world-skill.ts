import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserDragonbreathArrowLightning = {
  id: "01a06575-9822-7627-bd56-f578b9959188",
  type: "page-type/world-skill",
  slug: "lesser-dragonbreath-arrow-lightning",
  title: "Lesser Dragonbreath Arrow (Lightning)",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-skill/swallow-s-arrow"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.610Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
