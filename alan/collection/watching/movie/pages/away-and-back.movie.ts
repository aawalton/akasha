import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const awayAndBack = {
  id: "01a17499-8944-79e3-ac4a-173bc4459c3d",
  type: "page-type/movie",
  slug: "away-and-back",
  ownLength: 96,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-01-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "308715",
      externalLink: "https://www.themoviedb.org/movie/308715",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Away and Back",
  genres: ["Drama", "Comedy", "Family", "TV Movie"],
  imdbId: "tt4309834",
  posterPath: "/77gk16lKvUMRD8QmqpxNv5ZqRn9.jpg",
  voteAverage: 6.095,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
