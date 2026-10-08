import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const assertCommand = {
  id: "01a06575-97ee-7406-af89-7d591abeddef",
  type: "page-type/world-skill",
  slug: "assert-command",
  title: "Assert Command",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.558Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
