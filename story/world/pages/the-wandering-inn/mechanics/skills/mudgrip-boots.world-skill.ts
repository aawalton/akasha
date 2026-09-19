import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mudgripBoots = {
  id: "01a0657d-0270-7dbb-bf4c-238b7452ea7a",
  type: "page-type/world-skill",
  slug: "mudgrip-boots",
  title: "Mudgrip Boots",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
