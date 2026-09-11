import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const conditionalBountyQuests = {
  id: "01a06575-97fc-710a-ab03-a11aaf7d8e71",
  type: "world-skill",
  slug: "conditional-bounty-quests",
  title: "Conditional Bounty (Quests)",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
