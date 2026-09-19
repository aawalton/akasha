import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rockScent = {
  id: "01a0657d-02b6-7de1-a2db-88f9da65dbfa",
  type: "page-type/world-skill",
  slug: "rock-scent",
  title: "Rock Scent",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
