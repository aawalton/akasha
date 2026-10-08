import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boonOfTheGuest = {
  id: "01a06575-97f7-7805-852d-44282b398cd0",
  type: "page-type/world-skill",
  slug: "boon-of-the-guest",
  title: "Boon of the Guest",
  world: "world/the-wandering-inn",
  appearanceCount: 15,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.567Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
