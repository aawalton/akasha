import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const royalTax = {
  id: "01a0657d-02b7-7e99-89fb-5a9c1cc30735",
  type: "page-type/world-skill",
  slug: "royal-tax",
  title: "Royal Tax",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.647Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
