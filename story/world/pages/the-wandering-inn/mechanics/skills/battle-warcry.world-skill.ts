import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battleWarcry = {
  id: "01a06575-97f4-76ce-815b-8ee0fae89ff9",
  type: "page-type/world-skill",
  slug: "battle-warcry",
  title: "Battle Warcry",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
