import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const feintDodge = {
  id: "01a06575-980c-7db5-8fef-32ca21d59f08",
  type: "page-type/world-skill",
  slug: "feint-dodge",
  title: "Feint Dodge",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.588Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
