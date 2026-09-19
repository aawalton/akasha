import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armyCombinedActionPush = {
  id: "01a06575-97ec-7758-9e40-bec941def243",
  type: "page-type/world-skill",
  slug: "army-combined-action-push",
  title: "Army: Combined Action — Push",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
