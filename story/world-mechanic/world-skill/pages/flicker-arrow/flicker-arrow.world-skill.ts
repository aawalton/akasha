import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const flickerArrow = {
  id: "01a06575-980e-769b-884e-d9d48fc628d0",
  type: "world-skill",
  slug: "flicker-arrow",
  title: "Flicker Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
