import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e04 = {
  id: "01a18843-d150-7bb2-8cf3-f75a7c60398e",
  type: "page-type/episode",
  slug: "bluey-s02e04",
  description:
    "When Dad and Uncle Stripe play a game of squash, Bluey and Bingo are in control of their every move, and Bingo proves that big siblings don’t always beat little siblings.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 4,
  publishedAt: "2020-03-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2194120",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/4",
    },
  ],
  title: "Squash",
  episodeType: "standard",
  stillPath: "/jq6hAhN36GMU9s6O0uHO8G3I3vf.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
