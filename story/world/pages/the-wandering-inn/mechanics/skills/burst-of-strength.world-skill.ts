import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const burstOfStrength = {
  id: "01a06575-97f9-7b39-b4c8-d208fa5bb50a",
  type: "page-type/world-skill",
  slug: "burst-of-strength",
  title: "Burst of Strength",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
