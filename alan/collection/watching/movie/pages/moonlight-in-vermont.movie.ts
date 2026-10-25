import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const moonlightInVermont = {
  id: "01a17499-a7d6-7ec4-a172-9d815c90bd72",
  type: "page-type/movie",
  slug: "moonlight-in-vermont",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "446493",
      externalLink: "https://www.themoviedb.org/movie/446493",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Moonlight in Vermont",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt6587078",
  posterPath: "/wITyFvOffnDi09fqBmORUhE6zS6.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
