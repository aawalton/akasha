import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fightOrDie = {
  id: "01a06575-980c-794f-bcd9-2d3d0a075df6",
  type: "page-type/world-skill",
  slug: "fight-or-die",
  title: "Fight or Die",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.588Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
