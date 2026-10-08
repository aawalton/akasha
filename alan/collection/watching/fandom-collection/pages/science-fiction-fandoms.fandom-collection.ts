import type { FandomCollection } from "akasha/alan/collection/watching/fandom-collection/fandom-collection.page-type.types.ts"

export const scienceFictionFandoms = {
  id: "01a06808-5f7f-7003-93c0-833cfcfd5eb0",
  type: "page-type/fandom-collection",
  slug: "science-fiction-fandoms",
  title: "Science Fiction Fandoms",
  partOfCollections: ["fandom-collection/fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
  createdAt: "2026-09-03T16:09:34.335Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies FandomCollection
