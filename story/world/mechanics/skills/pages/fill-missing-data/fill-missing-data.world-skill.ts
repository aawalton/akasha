import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fillMissingData = {
  id: "01a06575-980c-77a0-951d-01e2aab21364",
  type: "page-type/world-skill",
  slug: "fill-missing-data",
  title: "Fill Missing Data",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
