import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armyDuplicateProjectiles = {
  id: "01a06575-97ed-7069-87d0-c4fff1341862",
  type: "page-type/world-skill",
  slug: "army-duplicate-projectiles",
  title: "Army: Duplicate Projectiles",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
