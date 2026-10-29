import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const jessicaJonesS01e02 = {
  id: "01a18849-e9ab-7209-aba9-a3ae49492d54",
  type: "page-type/episode",
  slug: "jessica-jones-s01e02",
  description:
    "Jessica vows to prove Hope's innocence, even though it means tracking down a terrifying figure from her own past.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-jessica-jones-season-1"],
  position: 2,
  publishedAt: "2015-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1105755",
      externalLink: "https://www.themoviedb.org/tv/38472/season/1/episode/2",
    },
  ],
  title: "AKA Crush Syndrome",
  episodeType: "standard",
  stillPath: "/mmZXXJAEuDfid42mFotL3PGes41.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:31:47.755Z",
  updatedAt: "2026-10-29T15:31:47.755Z",
} as const satisfies Episode
