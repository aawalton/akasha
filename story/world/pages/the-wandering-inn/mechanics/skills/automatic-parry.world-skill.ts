import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const automaticParry = {
  id: "01a06575-97f0-7b66-b3e4-9f12a2a43b2e",
  type: "page-type/world-skill",
  slug: "automatic-parry",
  title: "Automatic Parry",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.560Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
