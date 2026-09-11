import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const soldier = {
  id: "01a0657e-025c-7037-bbff-a7f308b10793",
  type: "world-class",
  slug: "soldier",
  title: "Soldier",
  world: "the-wandering-inn",
  aliases: ["Soldier."],
  references: "jsonl",
} as const satisfies WorldClass
