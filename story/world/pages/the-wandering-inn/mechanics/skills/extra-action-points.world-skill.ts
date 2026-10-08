import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const extraActionPoints = {
  id: "01a06575-980a-71de-9be2-321936d43550",
  type: "page-type/world-skill",
  slug: "extra-action-points",
  title: "Extra Action Points",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.586Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
