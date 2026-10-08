import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greatEnemyGoblin = {
  id: "01a06575-9816-7e0e-8a56-b8487d536d7b",
  type: "page-type/world-skill",
  slug: "great-enemy-goblin",
  title: "Great Enemy: Goblin",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.598Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
