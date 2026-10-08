import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const extendedBlade = {
  id: "01a06575-980a-77d0-b2f3-b0377639f663",
  type: "page-type/world-skill",
  slug: "extended-blade",
  title: "Extended Blade",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.586Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
