import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const assassin = {
  id: "01a0657e-01ae-72ee-a5dc-a5418acb42ae",
  type: "world-class",
  slug: "assassin",
  title: "Assassin",
  world: "the-wandering-inn",
  aliases: ["assassins"],
  references: "jsonl",
} as const satisfies WorldClass
