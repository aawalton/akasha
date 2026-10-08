import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const farshotMastery = {
  id: "01a06575-980b-72b5-a4e5-2fcfcfc83092",
  type: "page-type/world-skill",
  slug: "farshot-mastery",
  title: "Farshot Mastery",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.587Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
