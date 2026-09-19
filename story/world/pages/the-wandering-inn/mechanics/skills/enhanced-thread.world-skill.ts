import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedThread = {
  id: "01a06575-9809-74d0-b1d4-faad04e3ea51",
  type: "page-type/world-skill",
  slug: "enhanced-thread",
  title: "Enhanced Thread",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
