import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const forewarningMonsters = {
  id: "01a06575-9810-7d24-8936-d556306c922c",
  type: "page-type/world-skill",
  slug: "forewarning-monsters",
  title: "Forewarning: Monsters",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.592Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
