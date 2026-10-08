import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boons = {
  id: "01a06575-97f8-79e6-b149-e225a651f867",
  type: "page-type/world-skill",
  slug: "boons",
  title: "Boons",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.568Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
