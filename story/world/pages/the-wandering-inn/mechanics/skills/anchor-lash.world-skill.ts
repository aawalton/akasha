import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const anchorLash = {
  id: "01a06575-97eb-71f7-8d56-bf12e93f2133",
  type: "page-type/world-skill",
  slug: "anchor-lash",
  title: "Anchor Lash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
