import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS06e07 = {
  id: "01a1884b-301d-7b77-9053-4b6d2a4cc3ae",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s06e07",
  description:
    "After a natural gas explosion at a movie theater, the NCIS team discovers the gas company has been hacked and more explosions could be triggered.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-6"],
  position: 7,
  publishedAt: "2019-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1982523",
      externalLink: "https://www.themoviedb.org/tv/61387/season/6/episode/7",
    },
  ],
  title: "Boom-Boom-Boom-Boom",
  episodeType: "standard",
  stillPath: "/3GpxYRSqjsPQyDCkyAzc9z7e8Kw.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
