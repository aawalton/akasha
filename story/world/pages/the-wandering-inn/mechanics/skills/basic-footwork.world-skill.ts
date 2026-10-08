import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicFootwork = {
  id: "01a06575-97f3-739d-ab05-fe6ed2aea0a4",
  type: "page-type/world-skill",
  slug: "basic-footwork",
  title: "Basic Footwork",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.563Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
