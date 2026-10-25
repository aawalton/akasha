import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const autumnInTheVineyard = {
  id: "01a17499-a7d3-756a-8116-3d5c2c1c6828",
  type: "page-type/movie",
  slug: "autumn-in-the-vineyard",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/in-the-vineyard"],
  position: 1,
  publishedAt: "2016-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "413441",
      externalLink: "https://www.themoviedb.org/movie/413441",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Autumn in the Vineyard",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt6041048",
  posterPath: "/17GH8ACvkrNdYhJx9yLd1FWlxjo.jpg",
  voteAverage: 6.202,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T20:45:04.980Z",
} as const satisfies Movie
