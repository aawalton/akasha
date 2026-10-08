import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterDexterity = {
  id: "01a06575-9816-736e-a722-ca6e6cb08f36",
  type: "page-type/world-skill",
  slug: "greater-dexterity",
  title: "Greater Dexterity",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.598Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
