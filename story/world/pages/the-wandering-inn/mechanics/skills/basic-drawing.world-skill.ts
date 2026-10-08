import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicDrawing = {
  id: "01a06575-97f3-7a7c-9bf0-c7bd57b4cf24",
  type: "page-type/world-skill",
  slug: "basic-drawing",
  title: "Basic Drawing",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.563Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
