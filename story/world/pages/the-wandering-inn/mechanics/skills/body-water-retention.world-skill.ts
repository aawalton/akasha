import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bodyWaterRetention = {
  id: "01a06575-97f7-7a56-bde6-7421a8fcb545",
  type: "page-type/world-skill",
  slug: "body-water-retention",
  title: "Body: Water Retention",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
