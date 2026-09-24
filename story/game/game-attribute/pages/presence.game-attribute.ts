import type { GameAttribute } from "akasha/story/game/game-attribute/game-attribute.page-type.types.ts"

export const presence = {
  id: "01a0c48a-b3b1-7a76-96c5-4b2adf44fa3c",
  type: "page-type/game-attribute",
  slug: "presence",
  title: "Presence",
  least: 3,
  most: 18,
} as const satisfies GameAttribute
