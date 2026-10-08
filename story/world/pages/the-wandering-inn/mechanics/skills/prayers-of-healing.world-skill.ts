import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const prayersOfHealing = {
  id: "01a0657d-0296-7668-87b0-88bd30a4f113",
  type: "page-type/world-skill",
  slug: "prayers-of-healing",
  title: "Prayers of Healing",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.614Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
