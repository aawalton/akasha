import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dangerMark = {
  id: "01a06575-9800-7901-b24b-822da4355d01",
  type: "page-type/world-skill",
  slug: "danger-mark",
  title: "Danger Mark",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.576Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
