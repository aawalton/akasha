import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const betterPotion = {
  id: "01a06575-97f5-70de-815d-69fa4c9047c8",
  type: "world-skill",
  slug: "better-potion",
  title: "Better Potion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
