import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const expertProficiency = {
  id: "01a06575-980a-71b1-9419-db59b20c94c5",
  type: "page-type/world-skill",
  slug: "expert-proficiency",
  title: "Expert Proficiency",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.586Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
