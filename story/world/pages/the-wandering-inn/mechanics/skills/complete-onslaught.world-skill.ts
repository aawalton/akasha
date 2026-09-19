import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const completeOnslaught = {
  id: "01a06575-97fc-761b-a2e7-195fd89f1073",
  type: "page-type/world-skill",
  slug: "complete-onslaught",
  title: "Complete Onslaught",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
