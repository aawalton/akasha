import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aFreeCompliment = {
  id: "01a06575-97e7-7e46-928e-6f33eabd052c",
  type: "page-type/world-skill",
  slug: "a-free-compliment",
  title: "A Free Compliment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
