import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const raiseTheBanner = {
  id: "01a0657d-029c-7d7a-aa91-77ee4c490592",
  type: "page-type/world-skill",
  slug: "raise-the-banner",
  title: "Raise the Banner",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.620Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
