import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const featherJump = {
  id: "01a06575-980c-7552-89bd-3aecf48fb25b",
  type: "page-type/world-skill",
  slug: "feather-jump",
  title: "Feather Jump",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.588Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
