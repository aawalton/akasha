import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const accidentPrevention = {
  id: "01a06575-97e8-7a39-b13f-6e6b995ce2d6",
  type: "page-type/world-skill",
  slug: "accident-prevention",
  title: "Accident Prevention",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.552Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
