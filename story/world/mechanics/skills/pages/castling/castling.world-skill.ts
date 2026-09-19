import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const castling = {
  id: "01a06575-97fa-7a36-a471-daaecba89cc5",
  type: "page-type/world-skill",
  slug: "castling",
  title: "Castling",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
