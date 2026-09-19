import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advantageCityfolk = {
  id: "01a06575-97e9-7d90-b9f3-63428189a5ba",
  type: "page-type/world-skill",
  slug: "advantage-cityfolk",
  title: "Advantage: Cityfolk",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
