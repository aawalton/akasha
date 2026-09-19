import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rockPolishing = {
  id: "01a0657d-02b6-7e48-8494-108a4e86897e",
  type: "page-type/world-skill",
  slug: "rock-polishing",
  title: "Rock Polishing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
