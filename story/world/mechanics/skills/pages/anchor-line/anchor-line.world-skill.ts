import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const anchorLine = {
  id: "01a06575-97eb-7c60-b2bd-4795f1bcabda",
  type: "page-type/world-skill",
  slug: "anchor-line",
  title: "Anchor Line",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
