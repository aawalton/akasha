import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const empowerArtifact = {
  id: "01a06575-9808-704b-9e66-6336f2ee8509",
  type: "page-type/world-skill",
  slug: "empower-artifact",
  title: "Empower Artifact",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
