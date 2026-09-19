import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const goldenYield = {
  id: "01a06575-9815-7cb9-8fc8-4d5efdf66db9",
  type: "page-type/world-skill",
  slug: "golden-yield",
  title: "Golden Yield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
