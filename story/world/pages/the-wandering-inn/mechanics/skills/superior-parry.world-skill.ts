import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superiorParry = {
  id: "01a0657d-0302-71cc-9e71-b0d9189351fd",
  type: "page-type/world-skill",
  slug: "superior-parry",
  title: "Superior Parry",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.722Z",
  updatedAt: "2026-09-22T13:33:34.000Z",
} as const satisfies WorldSkill
