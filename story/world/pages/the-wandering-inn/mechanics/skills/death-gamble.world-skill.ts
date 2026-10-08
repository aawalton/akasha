import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deathGamble = {
  id: "01a06575-9802-7cab-b36b-a9040d69b096",
  type: "page-type/world-skill",
  slug: "death-gamble",
  title: "Death Gamble",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.578Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
