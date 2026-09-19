import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hammerStrike = {
  id: "01a06575-9818-7702-916a-7131a78f4bfe",
  type: "page-type/world-skill",
  slug: "hammer-strike",
  title: "Hammer Strike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
