import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const balancedPosture = {
  id: "01a06575-97f2-766c-b2da-4989dd0150fd",
  type: "page-type/world-skill",
  slug: "balanced-posture",
  title: "Balanced Posture",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.562Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
