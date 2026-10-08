import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const disarmingAttack = {
  id: "01a06575-9804-7b4c-aa84-24bf975e5773",
  type: "page-type/world-skill",
  slug: "disarming-attack",
  title: "Disarming Attack",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.580Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
