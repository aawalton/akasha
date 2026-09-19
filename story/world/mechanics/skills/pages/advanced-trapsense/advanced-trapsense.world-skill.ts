import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advancedTrapsense = {
  id: "01a06575-97e9-78d1-8302-2fb5727a755b",
  type: "page-type/world-skill",
  slug: "advanced-trapsense",
  title: "Advanced Trapsense",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
