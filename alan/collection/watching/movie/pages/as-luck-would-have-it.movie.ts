import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const asLuckWouldHaveIt = {
  id: "01a1749a-2599-7886-b3ec-df8801f8078a",
  type: "page-type/movie",
  slug: "as-luck-would-have-it",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "795980",
      externalLink: "https://www.themoviedb.org/movie/795980",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "As Luck Would Have It",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt13775584",
  posterPath: "/50dVUPdEI1qWhiTnIWN3NIZqftn.jpg",
  voteAverage: 6.533,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
