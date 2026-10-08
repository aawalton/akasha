import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spearFlurry = {
  id: "01a0657d-02ec-7b66-8bba-cfc9ee0f7ced",
  type: "page-type/world-skill",
  slug: "spear-flurry",
  title: "Spear Flurry",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.700Z",
  updatedAt: "2026-09-22T13:33:26.000Z",
} as const satisfies WorldSkill
