import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const empowerArtifact = {
  id: "01a06575-9808-704b-9e66-6336f2ee8509",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "empower-artifact",
  title: "Empower Artifact",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
