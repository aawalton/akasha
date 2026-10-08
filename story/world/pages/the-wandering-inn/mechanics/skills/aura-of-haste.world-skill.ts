import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfHaste = {
  id: "01a06575-97ee-7930-8df2-bdee74b2a6ac",
  type: "page-type/world-skill",
  slug: "aura-of-haste",
  title: "Aura of Haste",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.558Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
