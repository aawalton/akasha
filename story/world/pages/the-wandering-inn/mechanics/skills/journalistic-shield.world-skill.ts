import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const journalisticShield = {
  id: "01a06575-9820-78a2-8085-f6b1514edbfd",
  type: "page-type/world-skill",
  slug: "journalistic-shield",
  title: "Journalistic Shield",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.608Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
