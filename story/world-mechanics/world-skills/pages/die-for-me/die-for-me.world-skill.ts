import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const dieForMe = {
  id: "01a06575-9803-74a4-93ab-d0605bd20973",
  type: "world-skill",
  slug: "die-for-me",
  title: "Die For Me",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
