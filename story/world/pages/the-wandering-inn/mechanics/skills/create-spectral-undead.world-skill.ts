import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const createSpectralUndead = {
  id: "01a06575-97ff-70a7-a2cb-ce9a9981f925",
  type: "page-type/world-skill",
  slug: "create-spectral-undead",
  title: "Create Spectral Undead",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.575Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
