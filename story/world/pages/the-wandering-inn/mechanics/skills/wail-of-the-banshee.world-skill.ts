import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wailOfTheBanshee = {
  id: "01a0657d-032c-7111-9a91-4880afec05b3",
  type: "page-type/world-skill",
  slug: "wail-of-the-banshee",
  title: "Wail of the Banshee",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.764Z",
  updatedAt: "2026-09-22T13:33:49.000Z",
} as const satisfies WorldSkill
