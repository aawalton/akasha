import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldDestroyer = {
  id: "01a0657d-02c0-7d88-9681-51c3a5df7fdf",
  type: "page-type/world-skill",
  slug: "shield-destroyer",
  title: "Shield Destroyer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
