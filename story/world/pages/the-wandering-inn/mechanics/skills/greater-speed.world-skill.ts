import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterSpeed = {
  id: "01a06575-9817-7145-b54a-2ab7673b78c6",
  type: "page-type/world-skill",
  slug: "greater-speed",
  title: "Greater Speed",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.599Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
