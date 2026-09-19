import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const artifactDoubleCharging = {
  id: "01a06575-97ed-7c79-abdd-aca762dde92a",
  type: "page-type/world-skill",
  slug: "artifact-double-charging",
  title: "Artifact: Double Charging",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
