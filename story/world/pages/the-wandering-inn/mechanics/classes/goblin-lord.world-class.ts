import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const goblinLord = {
  id: "01a0657e-01e2-7132-97d5-113ae401edf6",
  type: "page-type/world-class",
  slug: "goblin-lord",
  title: "Goblin Lord",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  aliases: ["goblin-lords"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.970Z",
  updatedAt: "2026-09-22T13:29:04.000Z",
} as const satisfies WorldClass
