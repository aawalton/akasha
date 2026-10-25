import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const heavenDownHere = {
  id: "01a1749a-89a9-7a44-80b8-181e9373f857",
  type: "page-type/movie",
  slug: "heaven-down-here",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180683",
      externalLink: "https://www.themoviedb.org/movie/1180683",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Heaven Down Here",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt29684844",
  posterPath: "/7SE0EyR83fFhJ3f3JWSGwkS1R1F.jpg",
  voteAverage: 7.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
