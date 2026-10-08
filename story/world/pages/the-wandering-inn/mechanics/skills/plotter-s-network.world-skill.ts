import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const plotterSNetwork = {
  id: "01a0657d-0295-7513-9351-4c5075a9088a",
  type: "page-type/world-skill",
  slug: "plotter-s-network",
  title: "Plotter’s Network",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-skill/prepared-signal"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.613Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
