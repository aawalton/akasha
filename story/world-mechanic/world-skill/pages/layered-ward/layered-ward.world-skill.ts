import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const layeredWard = {
  id: "01a06575-9822-7cde-825d-c7c6376f0ca4",
  type: "world-skill",
  slug: "layered-ward",
  title: "Layered Ward",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
