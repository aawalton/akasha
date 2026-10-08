import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const crosscounterStrikes = {
  id: "01a06575-97ff-7611-b3e9-0706a0c0c935",
  type: "page-type/world-skill",
  slug: "crosscounter-strikes",
  title: "Crosscounter Strikes",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.575Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
