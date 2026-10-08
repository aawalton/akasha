import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const benediction = {
  id: "01a06575-97f5-78b9-a493-931e98b1637f",
  type: "page-type/world-skill",
  slug: "benediction",
  title: "Benediction",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.565Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
