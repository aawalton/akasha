import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfParalysis = {
  id: "01a06575-97ef-7d91-9840-4210adc63e0d",
  type: "page-type/world-skill",
  slug: "aura-of-paralysis",
  title: "Aura of Paralysis",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.559Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
