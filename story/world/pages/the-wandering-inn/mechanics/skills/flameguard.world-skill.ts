import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flameguard = {
  id: "01a06575-980d-7c10-890a-f78b044bd2f9",
  type: "page-type/world-skill",
  slug: "flameguard",
  title: "Flameguard",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.589Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
