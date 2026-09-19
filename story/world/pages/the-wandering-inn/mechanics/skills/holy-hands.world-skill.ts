import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const holyHands = {
  id: "01a06575-981a-7515-bde0-1d5ce11b3492",
  type: "page-type/world-skill",
  slug: "holy-hands",
  title: "Holy Hands",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
