import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flawlessDefence = {
  id: "01a06575-980e-7209-868d-10337fb68197",
  type: "page-type/world-skill",
  slug: "flawless-defence",
  title: "Flawless Defence",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.590Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
