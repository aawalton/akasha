import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const automaticDodge = {
  id: "01a06575-97f0-72de-817d-df55428fddc4",
  type: "page-type/world-skill",
  slug: "automatic-dodge",
  title: "Automatic Dodge",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.560Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
