import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fightYouRats = {
  id: "01a06575-980c-7c35-8ab5-2e005b1a213b",
  type: "page-type/world-skill",
  slug: "fight-you-rats",
  title: "Fight, You Rats",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.588Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
