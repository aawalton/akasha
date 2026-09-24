import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaLetItBe = {
  id: "01a0676a-d723-7000-8dc1-dda55d2dc9eb",
  type: "page-type/release",
  slug: "rockapella-let-it-be",
  title: "Let It Be",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-01-31",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ACMjPgeuyAGTnGy8siePH",
      externalLink: "https://open.spotify.com/album/0ACMjPgeuyAGTnGy8siePH",
    },
  ],
} as const satisfies Release
