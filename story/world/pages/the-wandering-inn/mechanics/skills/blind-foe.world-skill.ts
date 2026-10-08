import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const blindFoe = {
  id: "01a06575-97f6-741f-b7ba-d400aab09e20",
  type: "page-type/world-skill",
  slug: "blind-foe",
  title: "Blind Foe",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.566Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
