import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const incisiveComment = {
  id: "01a06575-981e-79c2-a1a0-5186f445753f",
  type: "page-type/world-skill",
  slug: "incisive-comment",
  title: "Incisive Comment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
