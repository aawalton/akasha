import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const soldier = {
  id: "01a0657e-025c-7037-bbff-a7f308b10793",
  type: "page-type/world-class",
  slug: "soldier",
  title: "Soldier",
  world: "world/the-wandering-inn",
  appearanceCount: 239,
  aliases: ["Soldier."],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.092Z",
  updatedAt: "2026-09-22T13:30:07.000Z",
} as const satisfies WorldClass
