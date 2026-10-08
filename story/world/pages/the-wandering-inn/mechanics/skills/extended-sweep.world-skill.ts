import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const extendedSweep = {
  id: "01a06575-980a-7669-8e44-3d28acfd37ce",
  type: "page-type/world-skill",
  slug: "extended-sweep",
  title: "Extended Sweep",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.586Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
