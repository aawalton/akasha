import type { GameAttribute } from "akasha/story/game/game-attribute/game-attribute.page-type.types.ts"

export const might = {
  id: "01a0c489-b113-7beb-8df6-a7089e0190ab",
  type: "page-type/game-attribute",
  slug: "might",
  title: "Might",
  least: 3,
  most: 18,
} as const satisfies GameAttribute
