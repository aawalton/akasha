import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const attackMeFirst = {
  id: "01a06575-97ee-7adb-b050-a82b4ada59c6",
  type: "page-type/world-skill",
  slug: "attack-me-first",
  title: "Attack Me First",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.558Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
