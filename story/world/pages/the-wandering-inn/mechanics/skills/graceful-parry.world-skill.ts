import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gracefulParry = {
  id: "01a06575-9816-745b-b19c-4e57bf122baf",
  type: "page-type/world-skill",
  slug: "graceful-parry",
  title: "Graceful Parry",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.598Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
