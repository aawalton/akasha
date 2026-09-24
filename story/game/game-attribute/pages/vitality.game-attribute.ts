import type { GameAttribute } from "akasha/story/game/game-attribute/game-attribute.page-type.types.ts"

export const vitality = {
  id: "01a0c48a-0947-78ff-8140-b1d24f9af663",
  type: "page-type/game-attribute",
  slug: "vitality",
  title: "Vitality",
  least: 3,
  most: 18,
} as const satisfies GameAttribute
