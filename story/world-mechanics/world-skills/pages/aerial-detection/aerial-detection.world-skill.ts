import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const aerialDetection = {
  id: "01a06575-97ea-7dcb-b2f2-3ff38343e1b0",
  type: "world-skill",
  slug: "aerial-detection",
  title: "Aerial Detection",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
