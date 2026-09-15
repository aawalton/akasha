import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const secondWind = {
  id: "01a0657d-02b8-72a6-ad7a-d6961ce9dde4",
  type: "world-skill",
  slug: "second-wind",
  title: "Second Wind",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
