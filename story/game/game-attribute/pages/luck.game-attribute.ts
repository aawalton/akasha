import type { GameAttribute } from "akasha/story/game/game-attribute/game-attribute.page-type.types.ts"

export const luck = {
  id: "01a0c48a-dd45-7a17-9799-c47a405b8177",
  type: "page-type/game-attribute",
  slug: "luck",
  title: "Luck",
  least: 3,
  most: 18,
} as const satisfies GameAttribute
