import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const diseaseDetector = {
  id: "01a06575-9804-7aa5-a70c-62c25e55a521",
  type: "page-type/world-skill",
  slug: "disease-detector",
  title: "Disease Detector",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
