import type { GameAttribute } from "akasha/story/game/game-attribute/game-attribute.page-type.types.ts"

export const finesse = {
  id: "01a0c489-dfa3-7944-bc6a-48c76fc16d46",
  type: "page-type/game-attribute",
  slug: "finesse",
  title: "Finesse",
  least: 3,
  most: 18,
} as const satisfies GameAttribute
