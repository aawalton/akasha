import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const compellingPresence = {
  id: "01a06575-97fc-7c5d-8b57-815e1c0a8b50",
  type: "page-type/world-skill",
  slug: "compelling-presence",
  title: "Compelling Presence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
