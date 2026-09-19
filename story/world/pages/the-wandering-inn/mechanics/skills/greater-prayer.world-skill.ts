import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterPrayer = {
  id: "01a06575-9817-7ff3-b80c-e9135319819a",
  type: "page-type/world-skill",
  slug: "greater-prayer",
  title: "Greater Prayer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
