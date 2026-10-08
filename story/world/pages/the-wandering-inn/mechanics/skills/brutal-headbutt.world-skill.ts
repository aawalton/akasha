import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const brutalHeadbutt = {
  id: "01a06575-97f9-7e1c-83f6-f745e07f1415",
  type: "page-type/world-skill",
  slug: "brutal-headbutt",
  title: "Brutal Headbutt",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.569Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
