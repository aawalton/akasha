import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfTheBrave = {
  id: "01a06575-97ef-7b81-8334-ce14820159aa",
  type: "page-type/world-skill",
  slug: "aura-of-the-brave",
  title: "Aura of the Brave",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.559Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
