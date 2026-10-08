import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hemostaticPause = {
  id: "01a06575-9819-7dd1-ac2e-345f7874d514",
  type: "page-type/world-skill",
  slug: "hemostatic-pause",
  title: "Hemostatic Pause",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.601Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
