import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advancedOrganTransplant = {
  id: "01a06575-97e9-7348-beb8-4a4fcde1a726",
  type: "page-type/world-skill",
  slug: "advanced-organ-transplant",
  title: "Advanced Organ Transplant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
