import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const anchorBoots = {
  id: "01a06575-97eb-78da-a73a-c5d0b5ea0172",
  type: "page-type/world-skill",
  slug: "anchor-boots",
  title: "Anchor Boots",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
