import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const headhunter = {
  id: "01a06575-9818-7dc2-9051-69b32a5b643c",
  type: "page-type/world-skill",
  slug: "headhunter",
  title: "Headhunter",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.600Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
