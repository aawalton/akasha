import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const diseaseDetector = {
  id: "01a06575-9804-7aa5-a70c-62c25e55a521",
  type: "page-type/world-skill",
  slug: "disease-detector",
  title: "Disease Detector",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.580Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
