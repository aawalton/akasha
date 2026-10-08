import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicRiding = {
  id: "01a06575-97f4-74f0-88a9-016a2fccf231",
  type: "page-type/world-skill",
  slug: "basic-riding",
  title: "Basic Riding",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
