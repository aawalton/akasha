import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const activateArtifactIncredibleEffect = {
  id: "01a06575-97e9-7976-87f8-7036f1162a75",
  type: "page-type/world-skill",
  slug: "activate-artifact-incredible-effect",
  title: "Activate Artifact: Incredible Effect",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
