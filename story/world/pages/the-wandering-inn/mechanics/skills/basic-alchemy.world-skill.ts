import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicAlchemy = {
  id: "01a06575-97f3-7e8b-b3f3-bfa51993a7de",
  type: "page-type/world-skill",
  slug: "basic-alchemy",
  title: "Basic Alchemy",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.563Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
