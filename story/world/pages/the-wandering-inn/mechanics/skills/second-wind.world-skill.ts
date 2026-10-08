import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const secondWind = {
  id: "01a0657d-02b8-72a6-ad7a-d6961ce9dde4",
  type: "page-type/world-skill",
  slug: "second-wind",
  title: "Second Wind",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.648Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
