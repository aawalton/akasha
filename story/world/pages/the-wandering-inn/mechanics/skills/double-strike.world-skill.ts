import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubleStrike = {
  id: "01a06575-9805-7fd5-b05c-9231ac264441",
  type: "page-type/world-skill",
  slug: "double-strike",
  title: "Double Strike",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.581Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
