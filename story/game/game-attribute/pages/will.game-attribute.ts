import type { GameAttribute } from "akasha/story/game/game-attribute/game-attribute.page-type.types.ts"

export const will = {
  id: "01a0c48a-8937-7db2-ae5d-18177ded9411",
  type: "page-type/game-attribute",
  slug: "will",
  title: "Will",
  least: 3,
  most: 18,
} as const satisfies GameAttribute
