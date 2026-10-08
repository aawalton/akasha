import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unitasisNetwork = {
  id: "01a0657d-031f-708f-b1a5-22beac1287f3",
  type: "page-type/world-skill",
  slug: "unitasis-network",
  title: "Unitasis Network",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-skill/unitasis-shared-skill-flawless-shot"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.751Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
