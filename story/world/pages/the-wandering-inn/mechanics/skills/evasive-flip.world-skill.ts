import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evasiveFlip = {
  id: "01a06575-9809-79a2-b8b2-4004cd2d2572",
  type: "page-type/world-skill",
  slug: "evasive-flip",
  title: "Evasive Flip",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
