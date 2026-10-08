import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spearArts = {
  id: "01a0657d-02ec-7bb8-9829-79ea754f5c7d",
  type: "page-type/world-skill",
  slug: "spear-arts",
  title: "Spear Arts",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.700Z",
  updatedAt: "2026-09-22T13:33:26.000Z",
} as const satisfies WorldSkill
