import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const aDropADay = {
  id: "01a06575-97e7-7b0b-aeb5-fa0c55297b60",
  type: "world-skill",
  slug: "a-drop-a-day",
  title: "A Drop A Day",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
