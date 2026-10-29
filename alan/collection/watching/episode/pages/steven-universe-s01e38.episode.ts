import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e38 = {
  id: "01a18855-67e6-7325-8aad-90a2cdd1fe28",
  type: "page-type/episode",
  slug: "steven-universe-s01e38",
  description:
    "Steven finds out that the Lunar Sea Spire mission from the third episode was a test and demands a new one.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 38,
  publishedAt: "2015-01-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1032448",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/38",
    },
  ],
  title: "The Test",
  episodeType: "standard",
  stillPath: "/d4HiBTKWkcZTwbl9U1i6XDKPWlw.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
