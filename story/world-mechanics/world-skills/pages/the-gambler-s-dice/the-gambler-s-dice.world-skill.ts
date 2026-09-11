import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const theGamblerSDice = {
  id: "01a0657d-0312-7163-a29c-e205bdda2fbb",
  type: "world-skill",
  slug: "the-gambler-s-dice",
  title: "The Gambler’s Dice",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
