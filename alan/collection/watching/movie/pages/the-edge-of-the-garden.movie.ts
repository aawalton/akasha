import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theEdgeOfTheGarden = {
  id: "01a17499-470e-750c-b0d7-1c7f710261d4",
  type: "page-type/movie",
  slug: "the-edge-of-the-garden",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "134147",
      externalLink: "https://www.themoviedb.org/movie/134147",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Edge of the Garden",
  genres: ["Fantasy", "Drama", "TV Movie"],
  imdbId: "tt1732169",
  posterPath: "/sTMVbIbtO2XhUiFWL6tb6XZ2eyv.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
