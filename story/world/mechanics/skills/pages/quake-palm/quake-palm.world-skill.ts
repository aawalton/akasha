import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quakePalm = {
  id: "01a0657d-029a-7eda-a107-d983c5c4e9b6",
  type: "page-type/world-skill",
  slug: "quake-palm",
  title: "Quake Palm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
