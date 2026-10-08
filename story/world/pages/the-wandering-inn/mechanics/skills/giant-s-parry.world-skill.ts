import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giantSParry = {
  id: "01a06575-9814-733d-8cc7-c53466979d16",
  type: "page-type/world-skill",
  slug: "giant-s-parry",
  title: "Giant’s Parry",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.596Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
