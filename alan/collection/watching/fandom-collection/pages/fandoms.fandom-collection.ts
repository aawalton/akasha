import type { FandomCollection } from "akasha/alan/collection/watching/fandom-collection/fandom-collection.page-type.types.ts"

export const fandoms = {
  id: "01a06808-5f7f-7001-a672-80b66c761e1e",
  type: "page-type/fandom-collection",
  slug: "fandoms",
  title: "Fandoms",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies FandomCollection
