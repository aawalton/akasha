import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubleOrNothing = {
  id: "01a06575-9805-73b9-ac69-2f111614a229",
  type: "page-type/world-skill",
  slug: "double-or-nothing",
  title: "Double or Nothing",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.581Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
