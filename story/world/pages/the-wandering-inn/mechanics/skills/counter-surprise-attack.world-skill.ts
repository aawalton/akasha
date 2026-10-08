import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const counterSurpriseAttack = {
  id: "01a06575-97fe-704d-8164-0ca870df9440",
  type: "page-type/world-skill",
  slug: "counter-surprise-attack",
  title: "Counter: Surprise Attack",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.574Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
