import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const goblinLords = {
  id: "01a0657e-136c-737a-9f42-cfbeea9f0622",
  type: "page-type/world-class",
  slug: "goblin-lords",
  title: "Goblin Lords",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
