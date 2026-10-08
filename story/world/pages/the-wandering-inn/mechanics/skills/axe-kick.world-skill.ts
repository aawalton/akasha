import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const axeKick = {
  id: "01a06575-97f2-7f67-bd87-5fd939a69779",
  type: "page-type/world-skill",
  slug: "axe-kick",
  title: "Axe Kick",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.562Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
