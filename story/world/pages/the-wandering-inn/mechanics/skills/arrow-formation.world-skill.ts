import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arrowFormation = {
  id: "01a06575-97ed-7167-9ed8-4cfae93ad377",
  type: "page-type/world-skill",
  slug: "arrow-formation",
  title: "Arrow Formation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
