import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const assignRareQuests = {
  id: "01a06575-97ee-7ac4-91a6-2ac4b3d3bf5a",
  type: "page-type/world-skill",
  slug: "assign-rare-quests",
  title: "Assign Rare Quests",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.558Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
