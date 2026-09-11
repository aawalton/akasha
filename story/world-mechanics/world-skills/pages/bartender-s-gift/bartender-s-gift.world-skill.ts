import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const bartenderSGift = {
  id: "01a06575-97f3-7d10-a30d-6eab5ff64143",
  type: "world-skill",
  slug: "bartender-s-gift",
  title: "Bartender’s Gift",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
