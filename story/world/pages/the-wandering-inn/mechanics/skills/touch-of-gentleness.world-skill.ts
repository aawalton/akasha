import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const touchOfGentleness = {
  id: "01a0657d-0315-7a35-ad9a-7b8c1e5fabb0",
  type: "page-type/world-skill",
  slug: "touch-of-gentleness",
  title: "Touch of Gentleness",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
