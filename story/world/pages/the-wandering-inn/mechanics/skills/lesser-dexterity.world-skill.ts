import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserDexterity = {
  id: "01a06575-9822-7cd5-858f-78604ed3b542",
  type: "page-type/world-skill",
  slug: "lesser-dexterity",
  title: "Lesser Dexterity",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.610Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
