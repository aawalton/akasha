import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const kitchenPreventSpills = {
  id: "01a06575-9821-7592-9af5-cb3220ebfb5b",
  type: "page-type/world-skill",
  slug: "kitchen-prevent-spills",
  title: "Kitchen: Prevent Spills",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.609Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
