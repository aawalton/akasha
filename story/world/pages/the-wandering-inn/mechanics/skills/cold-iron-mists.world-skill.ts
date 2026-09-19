import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const coldIronMists = {
  id: "01a06575-97fb-791c-84d3-56be08c3e054",
  type: "page-type/world-skill",
  slug: "cold-iron-mists",
  title: "Cold Iron Mists",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
