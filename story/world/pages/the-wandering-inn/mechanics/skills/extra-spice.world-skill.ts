import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const extraSpice = {
  id: "01a06575-980a-7668-b1d2-8567ce70315a",
  type: "page-type/world-skill",
  slug: "extra-spice",
  title: "Extra Spice",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.586Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
