import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const immunityPain = {
  id: "01a06575-981d-7854-89d0-d025ae99581f",
  type: "page-type/world-skill",
  slug: "immunity-pain",
  title: "Immunity: Pain",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.605Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
