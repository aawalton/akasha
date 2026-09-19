import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const helmetHead = {
  id: "01a06575-9819-7f53-9be4-1b6fc9f8b6df",
  type: "page-type/world-skill",
  slug: "helmet-head",
  title: "Helmet Head",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
