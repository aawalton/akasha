import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const assignBasicQuests = {
  id: "01a06575-97ee-793b-b93c-9a8dbaa75e4c",
  type: "page-type/world-skill",
  slug: "assign-basic-quests",
  title: "Assign Basic Quests",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.558Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
