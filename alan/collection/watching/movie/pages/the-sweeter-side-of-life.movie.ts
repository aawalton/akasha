import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSweeterSideOfLife = {
  id: "01a17499-66a2-7b0c-afca-2370f1ef9d85",
  type: "page-type/movie",
  slug: "the-sweeter-side-of-life",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "210983",
      externalLink: "https://www.themoviedb.org/movie/210983",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Sweeter_Side_of_Life" },
  ],
  title: "The Sweeter Side of Life",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt1278027",
  posterPath: "/sDJdffM8KR9eUtOp38JVGtix24x.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
