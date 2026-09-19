import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const betterPotion = {
  id: "01a06575-97f5-70de-815d-69fa4c9047c8",
  type: "page-type/world-skill",
  slug: "better-potion",
  title: "Better Potion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
