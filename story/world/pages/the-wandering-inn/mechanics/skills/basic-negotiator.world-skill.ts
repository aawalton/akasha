import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicNegotiator = {
  id: "01a06575-97f4-7152-8446-0fd354b97e7a",
  type: "page-type/world-skill",
  slug: "basic-negotiator",
  title: "Basic Negotiator",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
