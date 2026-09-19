import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shockwavePalm = {
  id: "01a0657d-02c1-74ca-a0a7-4e8c395547a6",
  type: "page-type/world-skill",
  slug: "shockwave-palm",
  title: "Shockwave Palm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
