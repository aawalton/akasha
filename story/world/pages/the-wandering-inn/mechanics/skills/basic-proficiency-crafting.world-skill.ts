import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicProficiencyCrafting = {
  id: "01a06575-97f4-7f3a-a3ee-d71a4f8ae009",
  type: "page-type/world-skill",
  slug: "basic-proficiency-crafting",
  title: "Basic Proficiency: Crafting",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
