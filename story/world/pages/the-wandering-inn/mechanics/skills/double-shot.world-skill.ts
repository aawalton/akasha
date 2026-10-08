import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubleShot = {
  id: "01a06575-9805-731e-a1f9-da06ea49cb08",
  type: "page-type/world-skill",
  slug: "double-shot",
  title: "Double Shot",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.581Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
