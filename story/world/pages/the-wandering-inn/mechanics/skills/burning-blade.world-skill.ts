import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const burningBlade = {
  id: "01a06575-97f9-72b1-9a73-b04df38a3ad2",
  type: "page-type/world-skill",
  slug: "burning-blade",
  title: "Burning Blade",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.569Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
