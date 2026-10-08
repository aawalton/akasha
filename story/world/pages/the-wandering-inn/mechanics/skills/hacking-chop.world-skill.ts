import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hackingChop = {
  id: "01a06575-9818-70c1-b49f-4464fe425a05",
  type: "page-type/world-skill",
  slug: "hacking-chop",
  title: "Hacking Chop",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.600Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
