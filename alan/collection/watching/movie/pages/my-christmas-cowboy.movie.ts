import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myChristmasCowboy = {
  id: "01a1749a-c86a-7a04-97a7-c67a7ea83b32",
  type: "page-type/movie",
  slug: "my-christmas-cowboy",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773350",
      externalLink: "https://www.themoviedb.org/movie/1773350",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Christmas Cowboy",
  genres: ["Romance"],
  imdbId: "tt46075976",
  posterPath: "/9WHyLhAvjbnW2c2srR6SZGyBssm.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
