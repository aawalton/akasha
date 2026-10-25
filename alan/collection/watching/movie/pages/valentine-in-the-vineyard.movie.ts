import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const valentineInTheVineyard = {
  id: "01a17499-e806-77af-8e86-e17c487be331",
  type: "page-type/movie",
  slug: "valentine-in-the-vineyard",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/in-the-vineyard"],
  position: 2,
  publishedAt: "2019-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "574933",
      externalLink: "https://www.themoviedb.org/movie/574933",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Valentine in the Vineyard",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9556850",
  posterPath: "/gqOOpzYVnXprhlhikegqJxfw9fq.jpg",
  voteAverage: 6.085,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
