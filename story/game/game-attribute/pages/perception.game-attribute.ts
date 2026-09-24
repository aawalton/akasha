import type { GameAttribute } from "akasha/story/game/game-attribute/game-attribute.page-type.types.ts"

export const perception = {
  id: "01a0c48a-5df8-790a-a6cb-9a5ab18cf20d",
  type: "page-type/game-attribute",
  slug: "perception",
  title: "Perception",
  least: 3,
  most: 18,
} as const satisfies GameAttribute
