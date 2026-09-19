import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giveItToMe = {
  id: "01a06575-9815-7064-8a33-d1a4b33a23f9",
  type: "page-type/world-skill",
  slug: "give-it-to-me",
  title: "Give It To Me",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
