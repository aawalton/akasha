import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const closeCounter = {
  id: "01a06575-97fb-78f0-9098-9bc902896f7f",
  type: "page-type/world-skill",
  slug: "close-counter",
  title: "Close Counter",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.571Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
