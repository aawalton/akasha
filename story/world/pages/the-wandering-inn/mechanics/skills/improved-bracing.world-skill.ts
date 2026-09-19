import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const improvedBracing = {
  id: "01a06575-981e-7cd3-92db-dac9d3a6dbe6",
  type: "page-type/world-skill",
  slug: "improved-bracing",
  title: "Improved Bracing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
