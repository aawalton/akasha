import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const holdlessThrow = {
  id: "01a06575-981a-79b0-8554-d2e9122305bb",
  type: "page-type/world-skill",
  slug: "holdless-throw",
  title: "Holdless Throw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
