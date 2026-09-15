import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const weirdAlYankovic2GreatestHits = {
  id: "01a0676a-d71f-702c-aaac-6eee5fa79775",
  type: "page-type/release",
  slug: "weird-al-yankovic-2-greatest-hits",
  title: "Greatest Hits",
  partOfCollections: ["artist/weird-al-yankovic"],
  position: 0,
  ownLength: 33.885517,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1988-10-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "30OiW6q8Ug7n0u2WN9vIfe",
      externalLink: "https://open.spotify.com/album/30OiW6q8Ug7n0u2WN9vIfe",
    },
  ],
} as const satisfies Release
