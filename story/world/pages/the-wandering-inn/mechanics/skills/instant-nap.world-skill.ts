import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const instantNap = {
  id: "01a06575-981f-785b-8f0e-97bc3e6353f9",
  type: "page-type/world-skill",
  slug: "instant-nap",
  title: "Instant Nap",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.607Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
