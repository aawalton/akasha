import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fleetFoot = {
  id: "01a06575-980e-7b17-b4d2-530cb9b417ca",
  type: "page-type/world-skill",
  slug: "fleet-foot",
  title: "Fleet Foot",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.590Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
