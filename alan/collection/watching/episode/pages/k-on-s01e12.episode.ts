import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS01e12 = {
  id: "01a183da-4479-78a4-aa90-cd3ae35750ae",
  type: "page-type/episode",
  slug: "k-on-s01e12",
  description: "Yui gets a fever. Will she recover in time for the festival?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-1"],
  position: 12,
  publishedAt: "2009-06-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3123879",
      externalLink: "https://www.themoviedb.org/tv/42253/season/1/episode/12",
    },
  ],
  title: "Light Music!",
  episodeType: "finale",
  stillPath: "/3FIO2pdtuK6nPxpwlY51AtwuhT5.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
