import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advantageTheUnchained = {
  id: "01a06575-97e9-7414-8f7d-a3767e4f754d",
  type: "page-type/world-skill",
  slug: "advantage-the-unchained",
  title: "Advantage: The Unchained",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
