import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const shieldWalls = {
  id: "01a0657d-02c0-7cf5-ac6a-7de7a0e26726",
  type: "world-skill",
  slug: "shield-walls",
  title: "Shield Walls",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
