import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const burningSpells = {
  id: "01a06575-97f9-7bc2-b853-a88c6c1db93d",
  type: "page-type/world-skill",
  slug: "burning-spells",
  title: "Burning Spells",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.569Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
