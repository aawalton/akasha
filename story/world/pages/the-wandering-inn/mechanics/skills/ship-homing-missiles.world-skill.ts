import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shipHomingMissiles = {
  id: "01a0657d-02c0-7194-8936-c702a6688ccd",
  type: "page-type/world-skill",
  slug: "ship-homing-missiles",
  title: "Ship: Homing Missiles",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
