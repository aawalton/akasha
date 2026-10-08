import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battleRoar = {
  id: "01a06575-97f4-772d-92fd-c5ef66a8fc77",
  type: "page-type/world-skill",
  slug: "battle-roar",
  title: "Battle Roar",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
