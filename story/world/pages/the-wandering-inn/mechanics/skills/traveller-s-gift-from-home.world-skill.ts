import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const travellerSGiftFromHome = {
  id: "01a0657d-0316-744b-a3a3-f5fb3b50cd00",
  type: "page-type/world-skill",
  slug: "traveller-s-gift-from-home",
  title: "Traveller’s Gift From Home",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  aliases: ["Traveller’s Gift from Home"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.742Z",
  updatedAt: "2026-09-22T13:33:42.000Z",
} as const satisfies WorldSkill
