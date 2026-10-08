import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const falconKick = {
  id: "01a06575-980b-7205-938f-b1f3ed3e6055",
  type: "page-type/world-skill",
  slug: "falcon-kick",
  title: "Falcon Kick",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.587Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
