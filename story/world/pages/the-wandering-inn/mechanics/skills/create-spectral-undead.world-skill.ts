import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const createSpectralUndead = {
  id: "01a06575-97ff-70a7-a2cb-ce9a9981f925",
  type: "page-type/world-skill",
  slug: "create-spectral-undead",
  title: "Create Spectral Undead",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
