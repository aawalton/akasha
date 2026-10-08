import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theGamblerSDice = {
  id: "01a0657d-0312-7163-a29c-e205bdda2fbb",
  type: "page-type/world-skill",
  slug: "the-gambler-s-dice",
  title: "The Gambler’s Dice",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.738Z",
  updatedAt: "2026-09-22T13:33:34.000Z",
} as const satisfies WorldSkill
