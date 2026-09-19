import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const closeCounter = {
  id: "01a06575-97fb-78f0-9098-9bc902896f7f",
  type: "page-type/world-skill",
  slug: "close-counter",
  title: "Close Counter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
