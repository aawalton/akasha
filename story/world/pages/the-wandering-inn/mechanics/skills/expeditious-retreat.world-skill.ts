import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const expeditiousRetreat = {
  id: "01a06575-980a-78d0-86d8-b7bdbacc222f",
  type: "page-type/world-skill",
  slug: "expeditious-retreat",
  title: "Expeditious Retreat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
