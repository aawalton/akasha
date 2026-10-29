import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateUniverseS02e03 = {
  id: "01a18855-2630-75ea-9786-3080681c85b1",
  type: "page-type/episode",
  slug: "stargate-universe-s02e03",
  description:
    "The crew encounters a ship remarkably similar to Destiny, which may hold the key to their returning home.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-universe-season-2"],
  position: 3,
  publishedAt: "2010-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "353558",
      externalLink: "https://www.themoviedb.org/tv/5148/season/2/episode/3",
    },
  ],
  title: "Awakening",
  episodeType: "standard",
  stillPath: "/mh4eSQw4MFwCcQALYjLk7YDu2Mp.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:44:04.143Z",
  updatedAt: "2026-10-29T15:44:04.143Z",
} as const satisfies Episode
