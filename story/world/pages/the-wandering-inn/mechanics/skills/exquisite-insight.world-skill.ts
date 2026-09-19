import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const exquisiteInsight = {
  id: "01a06575-980a-775e-95cb-c1e6b1b6b561",
  type: "page-type/world-skill",
  slug: "exquisite-insight",
  title: "Exquisite Insight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
