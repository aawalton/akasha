import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aMagicalGift = {
  id: "01a06575-97e7-7198-850f-ed7a40ba7b58",
  type: "page-type/world-skill",
  slug: "a-magical-gift",
  title: "A Magical Gift",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
