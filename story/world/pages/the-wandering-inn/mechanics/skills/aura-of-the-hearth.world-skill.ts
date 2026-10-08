import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfTheHearth = {
  id: "01a06575-97f0-70bb-9669-3974e25adef1",
  type: "page-type/world-skill",
  slug: "aura-of-the-hearth",
  title: "Aura of the Hearth",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.560Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
