import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicNegotiator = {
  id: "01a06575-97f4-7152-8446-0fd354b97e7a",
  type: "page-type/world-skill",
  slug: "basic-negotiator",
  title: "Basic Negotiator",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
