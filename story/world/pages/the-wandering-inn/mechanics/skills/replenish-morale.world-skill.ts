import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const replenishMorale = {
  id: "01a0657d-02b0-7816-8a3c-00c409f95c63",
  type: "page-type/world-skill",
  slug: "replenish-morale",
  title: "Replenish Morale",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.640Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
