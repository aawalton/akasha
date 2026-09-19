import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hearMe = {
  id: "01a06575-9819-7fe1-b7e7-49d06172f445",
  type: "page-type/world-skill",
  slug: "hear-me",
  title: "Hear Me",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
