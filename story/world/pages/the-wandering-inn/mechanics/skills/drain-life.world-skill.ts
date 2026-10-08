import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const drainLife = {
  id: "01a06575-9805-7537-a528-149c973b606b",
  type: "page-type/world-skill",
  slug: "drain-life",
  title: "Drain Life",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.581Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
