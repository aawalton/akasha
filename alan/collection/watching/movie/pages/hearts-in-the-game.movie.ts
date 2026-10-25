import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const heartsInTheGame = {
  id: "01a1749a-66be-75f6-ac4c-1e8dd443b4fc",
  type: "page-type/movie",
  slug: "hearts-in-the-game",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1093768",
      externalLink: "https://www.themoviedb.org/movie/1093768",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hearts in the Game",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt27138882",
  posterPath: "/splXLiA6xejDrsFWmtLSAcsgDzj.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
