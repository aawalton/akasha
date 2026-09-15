import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayHymnForTheWeekendSeebRemix = {
  id: "01a0676a-d720-707f-949c-b50a44ebc95b",
  type: "page-type/release",
  slug: "coldplay-hymn-for-the-weekend-seeb-remix",
  title: "Hymn for the Weekend (Seeb Remix)",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 3.544117,
  ownProgress: 3.544117,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-03-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ezwRysfWCrR5tDgpBwkIw",
      externalLink: "https://open.spotify.com/album/0ezwRysfWCrR5tDgpBwkIw",
    },
  ],
} as const satisfies Release
