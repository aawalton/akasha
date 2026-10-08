import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sharedTrip = {
  id: "01a0657d-02bf-72e9-940b-c697b4cb79fc",
  type: "page-type/world-skill",
  slug: "shared-trip",
  title: "Shared Trip",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.655Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
