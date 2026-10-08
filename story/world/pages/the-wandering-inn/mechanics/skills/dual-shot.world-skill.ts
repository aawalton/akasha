import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dualShot = {
  id: "01a06575-9806-7288-8e59-cde86dd44bb2",
  type: "page-type/world-skill",
  slug: "dual-shot",
  title: "Dual Shot",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.582Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
