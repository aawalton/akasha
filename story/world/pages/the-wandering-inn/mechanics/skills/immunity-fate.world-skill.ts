import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const immunityFate = {
  id: "01a06575-981d-7fdf-b22b-694bea5cb434",
  type: "page-type/world-skill",
  slug: "immunity-fate",
  title: "Immunity: Fate",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.605Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
