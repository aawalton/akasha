import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const blurLeap = {
  id: "01a06575-97f6-7e10-b417-d04e71428380",
  type: "page-type/world-skill",
  slug: "blur-leap",
  title: "Blur Leap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
