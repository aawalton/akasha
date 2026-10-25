import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const bestChristmasPartyEver = {
  id: "01a17499-8944-7b78-8657-157d2b8d7f0e",
  type: "page-type/movie",
  slug: "best-christmas-party-ever",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2014-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299590",
      externalLink: "https://www.themoviedb.org/movie/299590",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Best Christmas Party Ever",
  genres: ["Comedy", "TV Movie", "Drama"],
  imdbId: "tt4065316",
  posterPath: "/agoyhbjPUsPZH7kBBK445RjingQ.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
