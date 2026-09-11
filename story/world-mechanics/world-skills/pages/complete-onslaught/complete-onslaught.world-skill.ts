import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const completeOnslaught = {
  id: "01a06575-97fc-761b-a2e7-195fd89f1073",
  type: "world-skill",
  slug: "complete-onslaught",
  title: "Complete Onslaught",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
