import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const earthshape = {
  id: "01a06575-9806-710c-8547-acd3318db52a",
  type: "page-type/world-skill",
  slug: "earthshape",
  title: "Earthshape",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.582Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
