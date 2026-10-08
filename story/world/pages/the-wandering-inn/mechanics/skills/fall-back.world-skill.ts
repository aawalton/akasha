import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fallBack = {
  id: "01a06575-980b-7a48-9971-9fe1c2d3ef2d",
  type: "page-type/world-skill",
  slug: "fall-back",
  title: "Fall Back",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.587Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
