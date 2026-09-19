import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aDropADayPotionOfMending = {
  id: "01a06575-97e7-763a-930f-0420b6b6bb75",
  type: "page-type/world-skill",
  slug: "a-drop-a-day-potion-of-mending",
  title: "A Drop A Day: Potion of Mending",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
