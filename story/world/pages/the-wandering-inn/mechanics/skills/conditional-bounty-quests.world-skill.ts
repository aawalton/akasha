import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const conditionalBountyQuests = {
  id: "01a06575-97fc-710a-ab03-a11aaf7d8e71",
  type: "page-type/world-skill",
  slug: "conditional-bounty-quests",
  title: "Conditional Bounty (Quests)",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.572Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
