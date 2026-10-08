import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const empowerArtifact = {
  id: "01a06575-9808-704b-9e66-6336f2ee8509",
  type: "page-type/world-skill",
  slug: "empower-artifact",
  title: "Empower Artifact",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.584Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
