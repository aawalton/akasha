import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const elvenConcentration = {
  id: "01a06575-9807-7e1f-bad5-758c6637f8fb",
  type: "page-type/world-skill",
  slug: "elven-concentration",
  title: "Elven Concentration",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.583Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
