import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const longstep = {
  id: "01a0657d-0241-7c4a-845c-600e8a7a4e4e",
  type: "page-type/world-skill",
  slug: "longstep",
  title: "Longstep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
