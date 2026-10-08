import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ignorePain = {
  id: "01a06575-981c-7da5-aa21-232210507b59",
  type: "page-type/world-skill",
  slug: "ignore-pain",
  title: "Ignore Pain",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.604Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
