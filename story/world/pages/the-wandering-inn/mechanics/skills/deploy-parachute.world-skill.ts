import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deployParachute = {
  id: "01a06575-9803-787f-b229-ca2efb3c4b11",
  type: "page-type/world-skill",
  slug: "deploy-parachute",
  title: "Deploy Parachute",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.579Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
