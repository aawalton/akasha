import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greatEnemyGoblin = {
  id: "01a06575-9816-7e0e-8a56-b8487d536d7b",
  type: "page-type/world-skill",
  slug: "great-enemy-goblin",
  title: "Great Enemy: Goblin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
