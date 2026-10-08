import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterDodge = {
  id: "01a06575-9817-754a-81ce-72048184b220",
  type: "page-type/world-skill",
  slug: "greater-dodge",
  title: "Greater Dodge",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.599Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
