import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const imperialAppraiser = {
  id: "01a06575-981d-7237-8be0-bc3a5f707482",
  type: "page-type/world-skill",
  slug: "imperial-appraiser",
  title: "Imperial Appraiser",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.605Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
