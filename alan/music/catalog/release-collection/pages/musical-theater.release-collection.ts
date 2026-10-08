import type { ReleaseCollection } from "akasha/alan/music/catalog/release-collection/release-collection.page-type.types.ts"

export const musicalTheater = {
  id: "01a06808-805e-7001-a4fe-a8b0bdcbc84d",
  type: "page-type/release-collection",
  slug: "musical-theater",
  title: "Musical Theater",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  createdAt: "2026-09-03T16:09:42.750Z",
  updatedAt: "2026-09-15T16:40:57.000Z",
} as const satisfies ReleaseCollection
