import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS02e03 = {
  id: "01a183da-4479-755e-94dc-63bad6b705c5",
  type: "page-type/episode",
  slug: "k-on-s02e03",
  description:
    "Ritsu decides she doesn't want to be the drummer anymore. She wants to be in the spotlight.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-2"],
  position: 3,
  publishedAt: "2010-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879100",
      externalLink: "https://www.themoviedb.org/tv/42253/season/2/episode/3",
    },
  ],
  title: "Drummer!",
  episodeType: "standard",
  stillPath: "/iS7BhqVp7LzylOs9nBhqcqDO2yp.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
