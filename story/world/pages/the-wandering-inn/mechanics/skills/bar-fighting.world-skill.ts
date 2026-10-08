import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barFighting = {
  id: "01a06575-97f3-74fa-b80b-85806c97ec8e",
  type: "page-type/world-skill",
  slug: "bar-fighting",
  title: "Bar Fighting",
  world: "world/the-wandering-inn",
  appearanceCount: 11,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.563Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
