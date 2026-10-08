import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicTelekinesis = {
  id: "01a06575-97f4-70ec-b168-5a8ec8d834ca",
  type: "page-type/world-skill",
  slug: "basic-telekinesis",
  title: "Basic Telekinesis",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
