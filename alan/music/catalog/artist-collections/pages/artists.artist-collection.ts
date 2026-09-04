import type { ArtistCollection } from "../artist-collection.page-type.ts"

export const artists = {
  id: "01a06808-78fa-7000-8e30-9da42659901b",
  pageTypeSlug: "artist-collection",
  slug: "artists",
  title: "Artists",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-applicable",
} as const satisfies ArtistCollection
