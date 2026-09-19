import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heartbreakerKiss = {
  id: "01a06575-9819-71ee-ae5e-451d31ad38a9",
  type: "page-type/world-skill",
  slug: "heartbreaker-kiss",
  title: "Heartbreaker Kiss",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
