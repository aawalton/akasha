import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const automaticAiming = {
  id: "01a06575-97f0-7e12-b5e0-fa160afce159",
  type: "page-type/world-skill",
  slug: "automatic-aiming",
  title: "Automatic Aiming",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.560Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
