import type { GameAttribute } from "akasha/story/game/game-attribute/game-attribute.page-type.types.ts"

export const intellect = {
  id: "01a0c48a-3330-75ba-950f-e04ae792fed0",
  type: "page-type/game-attribute",
  slug: "intellect",
  title: "Intellect",
  least: 3,
  most: 18,
} as const satisfies GameAttribute
