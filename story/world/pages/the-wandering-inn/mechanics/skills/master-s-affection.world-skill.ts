import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const masterSAffection = {
  id: "01a0657d-024b-7a4b-81b9-9da0f00d5595",
  type: "page-type/world-skill",
  slug: "master-s-affection",
  title: "Master’s Affection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
