import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicRepair = {
  id: "01a06575-97f4-73d8-8f2e-2898f9137532",
  type: "page-type/world-skill",
  slug: "basic-repair",
  title: "Basic Repair",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
