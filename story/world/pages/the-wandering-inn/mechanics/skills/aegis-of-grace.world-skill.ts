import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aegisOfGrace = {
  id: "01a06575-97e9-7f68-a6a2-d92fd20598e3",
  type: "page-type/world-skill",
  slug: "aegis-of-grace",
  title: "Aegis of Grace",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
