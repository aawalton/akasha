import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const amateurLinguist = {
  id: "01a06575-97eb-7aca-93a2-b2ae5df9588e",
  type: "page-type/world-skill",
  slug: "amateur-linguist",
  title: "Amateur Linguist",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.555Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
