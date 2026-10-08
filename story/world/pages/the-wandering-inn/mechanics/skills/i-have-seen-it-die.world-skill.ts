import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iHaveSeenItDie = {
  id: "01a06575-981b-7d80-a68b-42d50816271b",
  type: "page-type/world-skill",
  slug: "i-have-seen-it-die",
  title: "I Have Seen It Die",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.603Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
