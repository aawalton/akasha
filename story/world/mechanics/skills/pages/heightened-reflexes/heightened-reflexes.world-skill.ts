import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heightenedReflexes = {
  id: "01a06575-9819-77d1-9e16-5534ebe623a4",
  type: "page-type/world-skill",
  slug: "heightened-reflexes",
  title: "Heightened Reflexes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
