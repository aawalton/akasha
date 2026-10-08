import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doorOfPortals = {
  id: "01a06575-9804-7c86-987b-4e8f5b9db5dc",
  type: "page-type/world-skill",
  slug: "door-of-portals",
  title: "Door of Portals",
  world: "world/the-wandering-inn",
  appearanceCount: 25,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.580Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
