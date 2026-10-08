import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicPenmanship = {
  id: "01a06575-97f4-798d-a612-c45799368a17",
  type: "page-type/world-skill",
  slug: "basic-penmanship",
  title: "Skill – Basic Penmans—",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
