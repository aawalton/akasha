import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const karolAManWhoBecamePope = {
  id: "01a17497-3827-7f6f-bd81-75771d9904cf",
  type: "page-type/movie",
  slug: "karol-a-man-who-became-pope",
  ownLength: 155,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-08-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "38516",
      externalLink: "https://www.themoviedb.org/movie/38516",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Karol:_A_Man_Who_Became_Pope",
    },
  ],
  title: "Karol: A Man Who Became Pope",
  genres: ["Drama", "History"],
  imdbId: "tt0435100",
  posterPath: "/6wIHnG3pM71IvGuXj40u47Vpt1s.jpg",
  voteAverage: 7,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
