import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const imbueSkill = {
  id: "01a06575-981c-7488-aea6-000de71df49d",
  type: "page-type/world-skill",
  slug: "imbue-skill",
  title: "Imbue Skill",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.604Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
