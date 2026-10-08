import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const delegateSkill = {
  id: "01a06575-9802-7224-9a0b-a71a625c9adf",
  type: "page-type/world-skill",
  slug: "delegate-skill",
  title: "Delegate Skill",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.578Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
