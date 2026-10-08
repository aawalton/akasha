import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const intimidatingShout = {
  id: "01a06575-9820-7cdc-a2cb-9d4a7b338d34",
  type: "page-type/world-skill",
  slug: "intimidating-shout",
  title: "Intimidating Shout",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.608Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
