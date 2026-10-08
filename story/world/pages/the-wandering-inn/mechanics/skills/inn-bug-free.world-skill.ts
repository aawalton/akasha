import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innBugFree = {
  id: "01a06575-981e-71bd-a0c7-ccb024c19f97",
  type: "page-type/world-skill",
  slug: "inn-bug-free",
  title: "Inn: Bug Free",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.606Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
