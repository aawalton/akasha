import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flavoredNuts = {
  id: "01a06575-980e-7436-9355-b100b2846ae4",
  type: "page-type/world-skill",
  slug: "flavored-nuts",
  title: "Flavored Nuts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
