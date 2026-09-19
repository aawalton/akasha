import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldbreaker = {
  id: "01a0657d-02c0-7025-a2d5-68d0536a834b",
  type: "page-type/world-skill",
  slug: "shieldbreaker",
  title: "Shieldbreaker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
