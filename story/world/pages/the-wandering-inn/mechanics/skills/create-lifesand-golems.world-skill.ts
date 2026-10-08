import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const createLifesandGolems = {
  id: "01a06575-97fe-77a5-a842-9c2a9c5ac63e",
  type: "page-type/world-skill",
  slug: "create-lifesand-golems",
  title: "Create Lifesand Golems",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.574Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
