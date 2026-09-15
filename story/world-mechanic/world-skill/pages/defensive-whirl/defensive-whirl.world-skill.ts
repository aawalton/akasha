import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const defensiveWhirl = {
  id: "01a06575-9802-7a5e-86dc-775e57ccc619",
  type: "world-skill",
  slug: "defensive-whirl",
  title: "Defensive Whirl",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
