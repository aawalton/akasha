import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const denyParry = {
  id: "01a06575-9803-740a-880b-11c8ea85956f",
  type: "page-type/world-skill",
  slug: "deny-parry",
  title: "Deny Parry",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.579Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
