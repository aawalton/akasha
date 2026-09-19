import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const circleOfProtection = {
  id: "01a06575-97fb-7f52-81fa-7ff50c6256b4",
  type: "page-type/world-skill",
  slug: "circle-of-protection",
  title: "Circle of Protection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
