import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const naturalToughness = {
  id: "01a0657d-0271-7040-beda-d459c0ac3771",
  type: "page-type/world-skill",
  slug: "natural-toughness",
  title: "Natural Toughness",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
