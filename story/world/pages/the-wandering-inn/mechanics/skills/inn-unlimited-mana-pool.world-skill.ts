import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innUnlimitedManaPool = {
  id: "01a06575-981f-7afb-8a32-1077e20c7f3d",
  type: "page-type/world-skill",
  slug: "inn-unlimited-mana-pool",
  title: "Inn: Unlimited Mana Pool",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.607Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
