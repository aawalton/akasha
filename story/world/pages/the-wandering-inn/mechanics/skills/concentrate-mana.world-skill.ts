import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const concentrateMana = {
  id: "01a06575-97fc-7d47-9f75-38ed09cba8ec",
  type: "page-type/world-skill",
  slug: "concentrate-mana",
  title: "Concentrate Mana",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.572Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
