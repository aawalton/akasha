import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const detectDisloyalty = {
  id: "01a06575-9803-7a75-b20c-0b35bc52f7d9",
  type: "world-skill",
  slug: "detect-disloyalty",
  title: "Detect Disloyalty",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
