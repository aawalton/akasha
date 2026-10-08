import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const groundedWheels = {
  id: "01a06575-9817-7af1-a766-8d80bc02d38b",
  type: "page-type/world-skill",
  slug: "grounded-wheels",
  title: "Grounded Wheels",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.599Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
