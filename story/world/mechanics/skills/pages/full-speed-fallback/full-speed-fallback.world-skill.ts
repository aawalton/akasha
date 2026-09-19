import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fullSpeedFallback = {
  id: "01a06575-9811-7b46-bd2b-6a7c486b44c5",
  type: "page-type/world-skill",
  slug: "full-speed-fallback",
  title: "Full-Speed Fallback",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
