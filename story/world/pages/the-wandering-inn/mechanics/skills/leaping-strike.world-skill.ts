import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const leapingStrike = {
  id: "01a06575-9822-71a7-8734-9ca1cd149baa",
  type: "page-type/world-skill",
  slug: "leaping-strike",
  title: "Leaping Strike",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.610Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
