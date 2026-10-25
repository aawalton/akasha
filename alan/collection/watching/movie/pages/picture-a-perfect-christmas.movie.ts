import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const pictureAPerfectChristmas = {
  id: "01a17499-e805-7c9c-bf74-a26d4f0c02c7",
  type: "page-type/movie",
  slug: "picture-a-perfect-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "626323",
      externalLink: "https://www.themoviedb.org/movie/626323",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Picture a Perfect Christmas",
  genres: ["Romance", "TV Movie", "Drama", "Comedy"],
  imdbId: "tt10553910",
  posterPath: "/6j8XUqPooxOzx8yLQIwFnvhf7k6.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
