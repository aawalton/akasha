import type { ArtistCollection } from "akasha/alan/music/catalog/artist-collection/artist-collection.page-type.types.ts"

export const artists = {
  id: "01a06808-78fa-7000-8e30-9da42659901b",
  type: "page-type/artist-collection",
  slug: "artists",
  title: "Artists",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
  createdAt: "2026-09-03T16:09:40.858Z",
  updatedAt: "2026-09-15T15:50:18.000Z",
} as const satisfies ArtistCollection
