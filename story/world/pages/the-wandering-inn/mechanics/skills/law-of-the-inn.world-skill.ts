import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lawOfTheInn = {
  id: "01a06575-9822-71b9-9c4e-28700f469f0a",
  type: "page-type/world-skill",
  slug: "law-of-the-inn",
  title: "Law of the Inn",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.610Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
