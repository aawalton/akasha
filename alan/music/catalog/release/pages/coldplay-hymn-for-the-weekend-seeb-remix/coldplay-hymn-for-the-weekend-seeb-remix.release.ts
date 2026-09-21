import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayHymnForTheWeekendSeebRemix = {
  id: "01a0676a-d720-707f-949c-b50a44ebc95b",
  type: "page-type/release",
  slug: "coldplay-hymn-for-the-weekend-seeb-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2016-03-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ezwRysfWCrR5tDgpBwkIw",
      externalLink: "https://open.spotify.com/album/0ezwRysfWCrR5tDgpBwkIw",
    },
  ],
  title: "Hymn for the Weekend (Seeb Remix)",
} as const satisfies Release
