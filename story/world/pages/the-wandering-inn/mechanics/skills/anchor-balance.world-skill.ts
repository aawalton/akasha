import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const anchorBalance = {
  id: "01a06575-97eb-7ac3-86e7-bf34ed167125",
  type: "page-type/world-skill",
  slug: "anchor-balance",
  title: "Anchor Balance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
