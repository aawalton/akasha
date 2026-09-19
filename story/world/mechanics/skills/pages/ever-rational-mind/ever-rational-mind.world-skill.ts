import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const everRationalMind = {
  id: "01a06575-9809-7dd1-8034-e0bd2e6ad472",
  type: "page-type/world-skill",
  slug: "ever-rational-mind",
  title: "Ever-Rational Mind",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
