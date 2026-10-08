import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const poisonImmunity = {
  id: "01a0657d-0295-79ac-b157-9285b65fa9ba",
  type: "page-type/world-skill",
  slug: "poison-immunity",
  title: "Poison Immunity",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.613Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
