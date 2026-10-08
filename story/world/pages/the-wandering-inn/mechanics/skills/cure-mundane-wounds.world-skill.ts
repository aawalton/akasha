import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cureMundaneWounds = {
  id: "01a06575-97ff-7afe-9cf1-d37e4ae329a7",
  type: "page-type/world-skill",
  slug: "cure-mundane-wounds",
  title: "Cure Mundane Wounds",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.575Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
